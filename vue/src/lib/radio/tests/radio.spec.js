import { mount } from '@vue/test-utils';
import Radio from '../index.vue';
import Label from '../../label/index.vue';
import Vue from 'vue';

Vue.component(Label.name, Label);

describe('Radio', () => {
  it('should match snapshot', () => {
    const wrapper = mount(Radio, {
      propsData: {
        htmlId: 'test123'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render one Radio', () => {
    const wrapper = mount(Radio, {
      propsData: {
        htmlId: 'test123'
      }
    });

    expect(wrapper.findAll('input').length).toEqual(1);
    expect(wrapper.findAll('label').length).toEqual(1);
  });

  it('should handle tabIndex', () => {
    const wrapper = mount(Radio, {
      propsData: {
        htmlId: 'test123',
        tabIndex: -1
      }
    });

    expect(wrapper.find('input').attributes().tabindex).toEqual('-1');
  });

  it('should render Label', () => {
    const wrapper = mount(Radio, {
      propsData: {
        htmlId: 'test123',
        label: 'test'
      }
    });

    expect(wrapper.contains(Label)).toEqual(true);
  });

  it('should pass class based on nesting', () => {
    const wrapper = mount(Radio, {
      propsData: {
        htmlId: 'test123',
        nestedLevel: 1
      }
    });

    expect(wrapper.classes('md-input--nested-1')).toEqual(true);
  });

  it('should handle disabled state', () => {
    const wrapper = mount(Radio, {
      propsData: {
        htmlId: 'test123',
        disabled: true
      }
    });

    expect(wrapper.find('input').attributes().disabled).toEqual('disabled');
  });

  it('should render children', () => {
    const wrapper = mount(Radio, {
      propsData: {
        htmlId: 'test123',
        label: 'test',
      },
      slots: {
        default: '<div class="test-text">I\'m here to help</div>'
      }
    });

    expect(wrapper.findAll('.test-text').length).toEqual(1);
    expect(wrapper.find('.test-text').text()).toEqual("I'm here to help");
  });

  it('should handle change event', () => {
    let count = 0;
    const countUp = () => count++;
    const wrapper = mount(Radio, {
      propsData: {
        htmlId: 'test123',
        label: 'test',
      },
      listeners: {
        change: countUp
      }
    });

    wrapper.find('input').trigger('change');
    expect(count).toEqual(1);
  });

  it('should support input ref', () => {
    const inputRef = 'input1';
    const wrapper = mount(Radio, {
      propsData: {
        htmlId: 'test123',
        label: 'test',
        inputRef: inputRef
      }
    });

    expect(wrapper.vm.$refs[inputRef].tagName).toEqual('INPUT');
  });
});

