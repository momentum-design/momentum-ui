import { mount, shallowMount } from '@vue/test-utils';
import SidebarHeader from '../index.vue';

describe('SidebarHeader', () => {
  it('should match snapshot', () => {
    const wrapper = mount(SidebarHeader);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallowMount(SidebarHeader, {
      propsData: {
        class: 'testClassName'
      }
    });

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = shallowMount(SidebarHeader, {
      slots: {
        default: `<div class='dummy-children'>Dummy Children</div>`
      }
    });

    expect(wrapper.find('.dummy-children').exists()).toBeTruthy();
  });
});

