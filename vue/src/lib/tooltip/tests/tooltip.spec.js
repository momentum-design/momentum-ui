import { shallowMount } from '@vue/test-utils';
import Tooltip from '../index.vue';
import Button from '../../button/index.vue';
import Popover from '../../popover/index.vue';
import Vue from 'vue';

Vue.component(Button.name, Button);
Vue.component(Popover.name, Popover);

describe('Tooltip', () => {
  beforeAll(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  it('should match snapshot', () => {
    const wrapper = shallowMount(Tooltip, {
      propsData: {
        tooltip: 'test',
        popoverProps: {
          fragment: false,
        }
      },
      slots: {
        default: `<div>Hi</div>`
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render on click', () => {
    const container = shallowMount(Tooltip, {
      propsData: {
        tooltip: 'test',
        tooltipTrigger: 'Click',
        popoverProps: {
          fragment: false,
        }
      },
      slots: {
        default: `<button>test</button>`
      }
    });
    const button = container.find('button');
    button.trigger('click');
    jest.runAllTimers();
    expect(container.find('.md-tooltip__text').text()).toEqual('test');
  });

  it('should render on Hover', () => {
    const container = shallowMount(Tooltip, {
      propsData: {
        tooltip: 'test',
        tooltipTrigger: 'MouseEnter',
        popoverProps: {
          fragment: false,
        }
      },
      slots: {
        default: `<button>test</button>`
      }
    });

    const button = container.find('button');
    button.trigger('mouseenter');
    jest.runAllTimers();

    expect(container.find('.md-tooltip__text').text()).toEqual('test');
  });

  it('should render on Focus', () => {
    const container = shallowMount(Tooltip, {
      propsData: {
        tooltip: 'test',
        tooltipTrigger: 'Focus',
        popoverProps: {
          fragment: false,
        }
      },
      slots: {
        default: `<button>test</button>`
      }
    });

    const button = container.find('button');
    button.trigger('focus');
    jest.runAllTimers();

    expect(container.find('.md-tooltip__text').text()).toEqual('test');
  });

  it('should set the width attribute when passed', () => {
    const container = shallowMount(Tooltip, {
      propsData: {
        tooltip: 'test',
        tooltipTrigger: 'Click',
        width: 100,
        popoverProps: {
          fragment: false,
        }
      },
      slots: {
        default: `<button>test</button>`
      }
    });

    const button = container.find('button');
    button.trigger('click');
    jest.runAllTimers();
    expect(container.find('.md-tooltip__text').attributes('style')).toEqual(
      'width: 100px;'
    );
  });

});
