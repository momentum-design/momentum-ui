import { shallowMount } from '@vue/test-utils';
import TopbarNav from '../index.vue';
import List from '../../../list/index.vue';
import Vue from 'vue';

Vue.component(List.name, List);

describe('TopbarNav', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(TopbarNav, {
      propsData: {
        id: 'test'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render one TopbarNav', () => {
    const container = shallowMount(TopbarNav);

    expect(container.classes('md-top-bar__nav')).toBeTruthy();
  });

  it('should add customized class name if className prop is set', () => {
    const container = shallowMount(TopbarNav, {
      propsData: {
        class: 'testClassName'
      }
    });

    expect(container.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children', () => {
    const container = shallowMount(TopbarNav, {
      slots: {
        default: `<div class="testingforTbN" />`
      }
    });

    expect(container.findAll('.testingforTbN').length).toEqual(1);
  });
});

