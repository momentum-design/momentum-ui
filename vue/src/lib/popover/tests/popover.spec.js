import { mount } from '@vue/test-utils';
import Popover from '../index.vue';
import EventOverlay from '../../event-overlay/index.vue';
import Button from '../../button/index.vue';
import Vue from 'vue';

Vue.component(EventOverlay.name, EventOverlay);
Vue.component(Button.name, Button);

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

describe('Popover', () => {
  beforeAll(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  it('should match snapshot', () => {
    const container = mount(Popover, {
      propsData: {
        fragment: false,
      },
      slots: {
        default: '<button>Hello</button>',
        content: '<span>Hello how are you doing</span>',
      }
    });
    expect(container.html()).toMatchSnapshot();
  });

  it('should render one Popover on click', () => {
    const container = mount(Popover, {
      propsData: {
        fragment: false,
        popoverTrigger: 'Click',
      },
      slots: {
        default: `<button class="anchor">Hello</button>`,
        content: `<span class="popover-content">
        Hello how are you doing
      </span>`,
      }
    });

    container.vm.$data.nativeOn = {};

    container.find('.anchor').trigger('click');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.anchor').trigger('click');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(0);

  });

  it('should fire onClose when closed', () => {
    const onClose = jest.fn();
    const container = mount(Popover, {
      propsData: {
        fragment: false,
        popoverTrigger: 'Click',
      },
      slots: {
        default: `<button class="anchor">Hello</button>`,
        content: `<span class="popover-content">
        Hello how are you doing
      </span>`,
      },
      listeners: {
        close: onClose,
      }
    });

    container.vm.$data.nativeOn = {};

    container.find('button').trigger('click');
    jest.runAllTimers();

    container.find('button').trigger('click');
    jest.runAllTimers();

    expect(onClose).toHaveBeenCalled();
  });

  it('focus -> mouseEnter -> mouseLeave -> blur, when popover trigger is MouseEnter', () => {
    const container = mount(Popover, {
      propsData: {
        fragment: false,
        popoverTrigger: 'MouseEnter',
      },
      slots: {
        default: `<button class="anchor">Hello</button>`,
        content: `<span class="popover-content">
        Hello how are you doing
      </span>`,
      }
    });

    container.vm.$data.nativeOn = {};

    container.find('.anchor').trigger('focus');
    jest.runAllTimers();
    expect(container.findAll('.md-event-overlay__children').length).toEqual(1);

    container.find('.anchor').trigger('mouseenter');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.anchor').trigger('mouseleave');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.anchor').trigger('blur');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(0);
  });

  it('focus -> mouseEnter -> blur -> mouseLeave, when popover trigger is MouseEnter', () => {
    const container = mount(Popover, {
      propsData: {
        fragment: false,
        popoverTrigger: 'MouseEnter',
      },
      slots: {
        default: `<button class="anchor">Hello</button>`,
        content: `<span class="popover-content">
        Hello how are you doing
      </span>`,
      }
    });

    container.vm.$data.nativeOn = {};

    container.find('.anchor').trigger('focus');
    jest.runAllTimers();
    expect(container.findAll('.md-event-overlay__children').length).toEqual(1);

    container.find('.anchor').trigger('mouseenter');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.anchor').trigger('blur');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(0);

    container.find('.anchor').trigger('mouseleave');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(0);
  });

  it('should render one Popover on mouseenter', () => {
    const container = mount(Popover, {
      propsData: {
        fragment: false,
        popoverTrigger: 'MouseEnter',
      },
      slots: {
        default: `<button class="anchor">Hello</button>`,
        content: `<span class="popover-content">
        Hello how are you doing
      </span>`,
      }
    });

    container.vm.$data.nativeOn = {};

    container.find('.anchor').trigger('mouseenter');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.anchor').trigger('mouseleave');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(0);
  });

  it('should start open and close Popover', () => {
    const container = mount(Popover, {
      propsData: {
        fragment: false,
        popoverTrigger: 'MouseEnter',
        startOpen: true,
      },
      slots: {
        default: `<button class="anchor">Hello</button>`,
        content: `<span class="popover-content">
        Hello how are you doing
      </span>`,
      }
    });

    container.vm.$data.nativeOn = {};

    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.anchor').trigger('mouseleave');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(0);
  });

  it('should render one Popover and not have Triggers', () => {
    const container = mount(Popover, {
      propsData: {
        fragment: false,
        popoverTrigger: 'None',
        startOpen: true,
      },
      slots: {
        default: `<button class="anchor">Hello</button>`,
        content: `<span class="popover-content">
        Hello how are you doing
      </span>`,
      }
    });

    container.vm.$data.nativeOn = {};

    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.anchor').trigger('mouseleave');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(1);
  });

  it('should not render Popover with popoverTrigger(None)', () => {
    const container = mount(Popover, {
      propsData: {
        fragment: false,
        popoverTrigger: 'None',
      },
      slots: {
        default: `<button class="anchor">Hello</button>`,
        content: `<span class="popover-content">
        Hello how are you doing
      </span>`,
      }
    });

    container.vm.$data.nativeOn = {};

    container.find('.anchor').trigger('focus');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(0);

    container.find('.anchor').trigger('mouseenter');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(0);

    container.find('button').trigger('click');
    jest.runAllTimers();
    expect(container.findAll('.popover-content').length).toEqual(0);
  });

  it('when show and hide with showDelay/hideDelay', () => {
    const container = mount(Popover, {
      propsData: {
        fragment: false,
        popoverTrigger: 'MouseEnter',
        showDelay: 200,
        hideDelay: 100,
      },
      slots: {
        default: `<button class="anchor">Hello</button>`,
        content: `<span class="popover-content">
        Hello how are you doing
      </span>`,
      }
    });

    container.vm.$data.nativeOn = {};

    container.find('.anchor').trigger('mouseenter');
    jest.runTimersToTime(300);
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.anchor').trigger('mouseleave');
    jest.runTimersToTime(1000);
    expect(container.findAll('.popover-content').length).toEqual(0);
  });

  it('when show and hide with delay', () => {
    const container = mount(Popover, {
      propsData: {
        fragment: false,
        popoverTrigger: 'MouseEnter',
        delay: 100,
      },
      slots: {
        default: `<button class="anchor">Hello</button>`,
        content: `<span class="popover-content">
        Hello how are you doing
      </span>`,
      }
    });

    container.vm.$data.nativeOn = {};

    container.find('.anchor').trigger('mouseenter');
    jest.runTimersToTime(200);
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.anchor').trigger('mouseleave');
    jest.runTimersToTime(99);
    expect(container.findAll('.popover-content').length).toEqual(1);

    jest.runTimersToTime(1000);
    expect(container.findAll('.popover-content').length).toEqual(0);
  });

  it('should remain open if mouse enters event overlay children prior to 500ms', () => {
    const container = mount(Popover, {
      propsData: {
        fragment: false,
        popoverTrigger: 'MouseEnter',
      },
      slots: {
        default: `<button class="anchor">Hello</button>`,
        content: `<span class="popover-content">
        Hello how are you doing
      </span>`,
      }
    });

    container.vm.$data.nativeOn = {};

    container.find('.anchor').trigger('mouseenter');
    jest.runTimersToTime(300);
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.anchor').trigger('mouseleave');
    jest.runTimersToTime(200);
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.md-event-overlay').trigger('mouseenter');
    jest.runTimersToTime(1000);
    expect(container.findAll('.popover-content').length).toEqual(1);
  });

  it('should close if mouse enters event overlay children after 500ms', () => {
    const container = mount(Popover, {
      propsData: {
        fragment: false,
        popoverTrigger: 'MouseEnter',
      },
      slots: {
        default: `<button class="anchor">Hello</button>`,
        content: `<span class="popover-content">
        Hello how are you doing
      </span>`,
      }
    });

    container.vm.$data.nativeOn = {};

    container.find('.anchor').trigger('mouseenter');
    jest.runTimersToTime(300);
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.anchor').trigger('mouseleave');
    jest.runTimersToTime(600);
    expect(container.findAll('.popover-content').length).toEqual(0);
  });

  it('should close if mouse enters event overlay children after a custom hover delay', () => {
    const container = mount(Popover, {
      propsData: {
        fragment: false,
        popoverTrigger: 'MouseEnter',
        hoverDelay: 200,
      },
      slots: {
        default: `<button class="anchor">Hello</button>`,
        content: `<span class="popover-content">
        Hello how are you doing
      </span>`,
      }
    });

    container.vm.$data.nativeOn = {};

    container.find('.anchor').trigger('mouseenter');
    jest.runTimersToTime(100);
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.anchor').trigger('mouseleave');
    jest.runTimersToTime(300);
    expect(container.findAll('.popover-content').length).toEqual(0);
  });

  it('should close if mouse leaves event overlay children after entering', () => {
    const container = mount(Popover, {
      propsData: {
        fragment: false,
        popoverTrigger: 'MouseEnter',
      },
      slots: {
        default: `<button class="anchor">Hello</button>`,
        content: `<span class="popover-content">
        Hello how are you doing
      </span>`,
      }
    });

    container.vm.$data.nativeOn = {};

    container.find('.anchor').trigger('mouseenter');
    jest.runTimersToTime(300);
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.anchor').trigger('mouseleave');
    jest.runTimersToTime(200);
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.md-event-overlay').trigger('mouseenter');
    jest.runTimersToTime(100);
    expect(container.findAll('.popover-content').length).toEqual(1);

    container.find('.md-event-overlay').trigger('mouseleave');
    jest.runTimersToTime(100);
    expect(container.findAll('.popover-content').length).toEqual(0);
  });
});
