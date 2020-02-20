import { shallowMount } from '@vue/test-utils';
import SidebarNav from '../index.vue';
import List from '../../../list/index.vue';
import Vue from 'vue';

Vue.component(List.name, List);

describe('SidebarNav', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(SidebarNav, {
      propsData: {
        navSectionTitle: 'Overview'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallowMount(SidebarNav, {
      propsData: {
        className: 'testClassName'
      }
    });

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = shallowMount(SidebarNav, {
      slots: {
        default: `<div class='dummy-children'>Dummy Children</div>`
      }
    });

    expect(wrapper.find('.dummy-children').exists()).toBeTruthy();
  });


  it('should render header if title set', () => {
    const wrapper = shallowMount(SidebarNav, {
      propsData: {
        title: 'testClassName'
      }
    });

    expect(wrapper.find('.md-sidebar-nav__header').exists()).toBeTruthy();
  });

  it('should render custom headerNode if passed in', () => {
    const wrapper = shallowMount(SidebarNav, {
      slots: {
        header: `<div class='dummy-header'>Dummy Children</div>`
      }
    });

    expect(wrapper.find('.dummy-header').exists()).toBeTruthy();
  });
});

