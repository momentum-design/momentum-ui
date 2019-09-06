import { shallowMount } from '@vue/test-utils';
import AriaModal from '../index.vue';
import FocusTrap from '../../focus-trap/index.vue';
import Vue from 'vue';

Vue.component(FocusTrap.name, FocusTrap);

describe('AriaModal', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(AriaModal, {
      propsData: {
        titleText: 'test',
        getApplicationNode: () => global.document.querySelector('#test')
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

