import { mount, shallowMount } from '@vue/test-utils';
import DatePicker from '../index.vue';
import DatePickerDay from '../date-picker-day/index.vue';
import DatePickerWeek from '../date-picker-week/index.vue';
import DatePickerMonth from '../date-picker-month/index.vue';
import DatePickerCalendar from '../date-picker-calendar/index.vue';
import EventOverlay from '../../event-overlay/index.vue';
import Button from '../../button/index.vue';
import Icon from '../../icon/index.vue';
import Vue from 'vue';
import moment from 'moment-timezone';

Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);
Vue.component(DatePickerDay.name, DatePickerDay);
Vue.component(DatePickerWeek.name, DatePickerWeek);
Vue.component(DatePickerMonth.name, DatePickerMonth);
Vue.component(DatePickerCalendar.name, DatePickerCalendar);
Vue.component(EventOverlay.name, EventOverlay);

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

describe('DatePicker', () => {
  const TEST_DATE = '2018-04-01';
  let day;

  beforeAll(() => {
    // setting timezone to CST
    moment.tz.setDefault('Asia/Kolkata');
    day = moment(TEST_DATE);
  });

  afterAll(() => {
    moment.tz.setDefault();
  });

  it("should show the calendar when focusing on the date input", () => {
    const container = shallowMount(DatePicker, {
      propsData: {
        selectedDate: day.toDate()
      },
      slots: {
        default: `<div class="trigger">Select Date</div>`
      },
    });
    expect(container).toMatchSnapshot();
  });

  it("should focus/select the selectedDate day if passed", () => {
    const container = mount(DatePicker, {
      propsData: {
        selectedDate: day.toDate()
      },
      slots: {
        default: `<div class="trigger">Select Date</div>`
      },
    });

    container.find('.trigger').trigger('click');
    expect(container.find('.md-button.md-datepicker__day--focus').text()).toEqual("1");
    expect(container.find('.md-button.md-datepicker__day--selected').text()).toEqual("1");
  });

  it("on press of enter should select the date", () => {
    const container = mount(DatePicker, {
      propsData: {
        selectedDate: day.toDate(),
        shouldCloseOnSelect: false
      },
      slots: {
        default: `<div class="trigger">Select Date</div>`
      },
    });

    container.find('.trigger').trigger('click');
    container.find('.md-button.md-datepicker__day--focus').trigger('click');
    expect(container.find('.md-button.md-datepicker__day--selected').text()).toEqual("1");
  });

  it("when shouldCloseOnSelect is true should close the DatePicker", () => {
    const container = mount(DatePicker, {
      propsData: {
        selectedDate: day.toDate(),
        shouldCloseOnSelect: true
      },
      slots: {
        default: `<div class="trigger">Select Date</div>`
      },
    });

    container.find('.trigger').trigger('click');
    container.find('.md-button.md-datepicker__day--focus').trigger('click');
    expect(container.findAll('.md-event-overlay__children').length).toEqual(0);
  });

  it("onSelect/onChange callback should be called when a date is clicked", () => {
    let selectedDate;
    let changedDate;
    const onSelectFn = jest.fn((e, date) => selectedDate = date);
    const onChangeFn = jest.fn((e, date) => changedDate = date);

    const container = mount(DatePicker, {
      propsData: {
        selectedDate: day.toDate(),
      },
      slots: {
        default: `<div class="trigger">Select Date</div>`
      },
      listeners: {
        select: onSelectFn,
        change: onChangeFn,
      }
    });

    container.find('.trigger').trigger('click');
    container.find('.md-button.md-datepicker__day--focus').trigger('click');
    expect(onSelectFn).toHaveBeenCalled();
    expect(onChangeFn).toHaveBeenCalled();

    expect(selectedDate).toEqual(day.toDate());
    expect(changedDate).toEqual(day.toDate());
  });

  it("onMonthChange callback should be called when a month switch happens", () => {
    let changedDate;
    const onMonthChangeFn = jest.fn((e, date) => changedDate = date);

    const container = mount(DatePicker, {
      propsData: {
        selectedDate: day.toDate(),
      },
      slots: {
        default: `<div class="trigger">Select Date</div>`
      },
      listeners: {
        monthChange: onMonthChangeFn,
      }
    });

    container.find('.trigger').trigger('click');
    //next month
    container.findAll('.md-button.md-button--icon').at(1)
      .trigger('click');
    expect(changedDate).toEqual(day.clone().add(1, 'month').toDate());
    expect(onMonthChangeFn).toHaveBeenCalledTimes(1);

    //prev month
    container.findAll('.md-button.md-button--icon').at(0)
      .trigger('click');
    expect(changedDate).toEqual(day.toDate());
    expect(onMonthChangeFn).toHaveBeenCalledTimes(2);
  });

  it('on click outside, should close the DatePicker', () => {
    const container = mount(DatePicker, {
      propsData: {
        selectedDate: day.toDate(),
      },
      slots: {
        default: `<div class="trigger">Select Date</div>`
      },
    });

    container.find('.trigger').trigger('click');
    expect(container.findAll('.md-event-overlay')).toHaveLength(1);

    // Dispatch click outside Event
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, true);
    document.dispatchEvent(evt);

    expect(container.findAll('.md-event-overlay')).toHaveLength(0);
  });

});

