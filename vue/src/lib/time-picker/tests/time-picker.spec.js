import { mount } from '@vue/test-utils';
import TimePicker from '../index.vue';
import TimeSelector from '../time-selector/index.vue';
import TimePickerDropdown from '../time-picker-dropdown/index.vue';
import Input from '../../input/index.vue';
import EventOverlay from '../../event-overlay/index.vue';
import moment from 'moment-timezone';
import Vue from 'vue';

Vue.component(TimeSelector.name, TimeSelector);
Vue.component(TimePickerDropdown.name, TimePickerDropdown);
Vue.component(Input.name, Input);
Vue.component(EventOverlay.name, EventOverlay);

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

describe('TimePicker', () => {

  beforeAll(() => {
    // setting timezone to CST
    moment.tz.setDefault('Asia/Shanghai');
  });

  afterAll(() => {
    moment.tz.setDefault();
  });

  it('should match snapshot', () => {
    const container = mount(TimePicker, {
      propsData: {
        id: 'test',
        selectedTime: new Date('Mon Nov 11 2019 14:00:00 GMT+0800'),
      }
    });
    expect(container.html()).toMatchSnapshot();
  });

  it('should render one TimePicker', () => {
    const container = mount(TimePicker, {
      propsData: {}
    });

    expect(container.findAll('.md-timepicker-container').length).toEqual(1);
  });

  it('allows clicks Up/Down Arrows for minutes and hours', () => {
    const onChange = jest.fn();
    const container = mount(TimePicker, {
      propsData: {
        selectedTime: new Date('Mon Nov 11 2019 14:00:00 GMT+0800'),
        
      },
      listeners: {
        change: onChange
      }
    });

    container.find('.md-input').trigger('focus');
    const arrowup = container.find('.inline-flex').findAll('.icon-arrow-up_24');
    // Test Up Arrow
    arrowup
      .at(0)
      .trigger('click');
    arrowup
      .at(1)
      .trigger('click');

    expect(container.vm.selectedTime2.format('HH')).toEqual('15');
    expect(container.vm.selectedTime2.format('mm')).toEqual('01');
    expect(onChange).toHaveBeenLastCalledWith(15, 1, 0);

    const arrowdown = container.find('.inline-flex').findAll('.icon-arrow-down_24');
    // Test Down Arrow
    arrowdown
      .at(0)
      .trigger('click');
    arrowdown
      .at(1)
      .trigger('click');
    expect(container.vm.selectedTime2.format('HH')).toEqual('14');
    expect(container.vm.selectedTime2.format('mm')).toEqual('00');
    expect(onChange).toHaveBeenLastCalledWith(14, 0, -1);
  });


  it('allows keypress Up/Down Arrows for minutes and hours', () => {
    const onChange = jest.fn();
    const container = mount(TimePicker, {
      propsData: {
        selectedTime: new Date('Mon Nov 11 2019 14:00:00 GMT+0800'),
      },
      listeners: {
        change: onChange
      }
    });

    container.find('.md-input').trigger('focus');

    const input = container.find('.inline-flex').findAll('input');
    const hourInput = input.at(0);
    const minuteInput = input.at(1);

    // Test Up Arrow KeyPress
    hourInput.trigger('focus');
    hourInput.trigger('keyup', { charCode: 38 });
    minuteInput.trigger('focus');
    minuteInput.trigger('keyup', { charCode: 38 });

    expect(container.vm.selectedTime2.format('HH')).toEqual('15');
    expect(container.vm.selectedTime2.format('mm')).toEqual('01');
    expect(onChange).toHaveBeenLastCalledWith(15, 1, 0);

    // // Test Down Arrow KeyPress
    hourInput.trigger('keyup', { charCode: 40 });
    minuteInput.trigger('keyup', { charCode: 40 });

    expect(container.vm.selectedTime2.format('HH')).toEqual('14');
    expect(container.vm.selectedTime2.format('mm')).toEqual('00');
    expect(onChange).toHaveBeenLastCalledWith(14, 0, -1);
  });
  
  it('allows scroll Up/Down for minutes and hours', () => {
    const onChange = jest.fn();
    const container = mount(TimePicker, {
      propsData: {
        selectedTime: new Date('Mon Nov 11 2019 14:00:00 GMT+0800'),
      },
      listeners: {
        change: onChange
      }
    });
    container.find('.md-input').trigger('focus');
    
    const input = container.find('.inline-flex').findAll('input');
    const hourInput = input.at(0);
    const minuteInput = input.at(1);

    // Test Scroll Up
    hourInput.trigger('focus');
    hourInput.trigger('wheel', { deltaY: -5 });
    minuteInput.trigger('focus');
    minuteInput.trigger('wheel', { deltaY: -5 });

    expect(container.vm.selectedTime2.format('HH')).toEqual('15');
    expect(container.vm.selectedTime2.format('mm')).toEqual('01');
    expect(onChange).toHaveBeenLastCalledWith(15, 1, 0);

    // Test Scroll Down
    hourInput.trigger('wheel', { deltaY: 5 });
    minuteInput.trigger('wheel', { deltaY: 5 });

    expect(container.vm.selectedTime2.format('HH')).toEqual('14');
    expect(container.vm.selectedTime2.format('mm')).toEqual('00');
    expect(onChange).toHaveBeenLastCalledWith(14, 0, -1);
  });

  it('allows clicks Up/Down Arrows for meridian', () => {
    const onChange = jest.fn();
    const container = mount(TimePicker, {
      propsData: {
        selectedTime: new Date('Mon Nov 11 2019 14:00:00 GMT+0800'),
      },
      listeners: {
        change: onChange
      }
    });

    container.find('.md-input').trigger('focus');
    const arrowup = container.find('.inline-flex').findAll('.icon-arrow-up_24');
    arrowup
      .at(2)
      .trigger('click');
    // Test Up Arrow
    expect(container.vm.selectedTime2.format('A')).toEqual('AM');
    expect(onChange).toHaveBeenLastCalledWith(2, 0, 0);

    // Test Down Arrow
    const arrowdown = container.find('.inline-flex').findAll('.icon-arrow-down_24');
    arrowdown
      .at(2)
      .trigger('click');
    expect(container.vm.selectedTime2.format('A')).toEqual('PM');
    expect(onChange).toHaveBeenLastCalledWith(14, 0, -1);
  });

  it('allows keypress Up/Down Arrows for meridian', () => {
    const onChange = jest.fn();
    const container = mount(TimePicker, {
      propsData: {
        selectedTime: new Date('Mon Nov 11 2019 14:00:00 GMT+0800'),
      },
      listeners: {
        change: onChange
      }
    });

    container.find('.md-input').trigger('focus');
    const input = container.find('.inline-flex').findAll('input');
    const meridianInput = input.at(2);

    meridianInput.trigger('focus');

    // Test Up Arrow KeyPress
    meridianInput.trigger('keyup', { charCode: 38 });

    expect(container.vm.selectedTime2.format('A')).toEqual('AM');
    expect(onChange).toHaveBeenLastCalledWith(2, 0, 0);

    // Test Down Arrow KeyPress
    meridianInput.trigger('keyup', { charCode: 40 });

    expect(container.vm.selectedTime2.format('A')).toEqual('PM');
    expect(onChange).toHaveBeenLastCalledWith(14, 0, -1);
  });

  it('renders military Time', () => {
    const container = mount(TimePicker, {
      propsData: {
        selectedTime: new Date('Mon Nov 11 2019 14:00:00 GMT+0800'),
        militaryTime: true,
      },
    });

    container.find('.md-input').trigger('focus');
    const input = container.find('.inline-flex').findAll('input');

    expect(input.length).toEqual(2);
    expect(input.at(0).element.value).toEqual('14');
    expect(input.at(1).element.value).toEqual('00');
  });

  it('allows minuteInterval prop to be passed', () => {
    const container = mount(TimePicker, {
      propsData: {
        selectedTime: new Date('Mon Nov 11 2019 14:00:00 GMT+0800'),
        minuteInterval: 15,
      },
    });

    container.find('.md-input').trigger('focus');
    container.find('.md-input').trigger('focus');
    const arrowup = container.find('.inline-flex').findAll('.icon-arrow-up_24');
    const arrowdown = container.find('.inline-flex').findAll('.icon-arrow-down_24');

    // Test Up Arrow
    arrowup
      .at(1)
      .trigger('click');
    expect(container.vm.selectedTime2.format('mm')).toEqual('15');
    // Test Down Arrow
    arrowdown
      .at(1)
      .trigger('click');
    expect(container.vm.selectedTime2.format('mm')).toEqual('00');
  });

  it('allows for direct input', () => {
    const onChange = jest.fn();
    const container = mount(TimePicker, {
      propsData: {
        selectedTime: new Date('Mon Nov 11 2019 14:00:00 GMT+0800'),
      },
      listeners: {
        change: onChange
      }
    });

    container.find('.md-input').trigger('focus');
    const hourInput = container.find('.inline-flex').findAll('input').at(0);
    const hourTimeSelector = container.findAll(TimeSelector).at(0);

    hourInput.element.value = '08';
    hourInput.trigger('change');
    hourInput.trigger('keydown.esc');
    hourInput.trigger('blur');
    console.log(container.vm.selectedTime2.toString());

    expect(container.vm.selectedTime2.format('HH')).toEqual('20');
    expect(onChange).toHaveBeenLastCalledWith(20, 0, 0);
  });


});

