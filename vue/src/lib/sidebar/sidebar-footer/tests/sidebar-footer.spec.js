import { mount, shallowMount } from '@vue/test-utils';
import SidebarFooter from '../index.vue';

describe('SidebarFooter', () => {
  it('should match snapshot', () => {
    const wrapper = mount(SidebarFooter);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallowMount(SidebarFooter, {
      propsData: {
        class: 'testClassName'
      }
    });

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = shallowMount(SidebarFooter, {
      slots: {
        default: `<div class='dummy-children'>Dummy Children</div>`
      }
    });

    expect(wrapper.find('.dummy-children').exists()).toBeTruthy();
  });
});

