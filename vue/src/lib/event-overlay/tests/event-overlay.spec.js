import { mount } from '@vue/test-utils';
import EventOverlay from '../index.vue';
import Button from '../../button/index.vue';
import Popover from '../../popover/index.vue';
import Vue from 'vue';

Vue.component(EventOverlay.name, EventOverlay);
Vue.component(Button.name, Button);
Vue.component(Popover.name, Popover);

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

describe('EventOverlay', () => {
  beforeAll(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  it('should match snapshot', () => {
    const wrapper = mount(EventOverlay, {
      slots: {
        default: '<span>Test</span>',
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

});

