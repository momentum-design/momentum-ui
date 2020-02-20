import { mount, shallowMount } from '@vue/test-utils';
import SidebarBody from '../index.vue';

describe('SidebarBody', () => {
  it('should match snapshot', () => {
    const wrapper = mount(SidebarBody);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallowMount(SidebarBody, {
      propsData: {
        class: 'testClassName'
      }
    });

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = shallowMount(SidebarBody, {
      slots: {
        default: `<div class='dummy-children'>Dummy Children</div>`
      }
    });

    expect(wrapper.find('.dummy-children').exists()).toBeTruthy();
  });
});

