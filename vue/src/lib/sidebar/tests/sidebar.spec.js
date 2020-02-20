import { mount, shallowMount } from '@vue/test-utils';
import Sidebar from '../index.vue';
import SidebarNav from '../sidebar-nav/index.vue';
import SidebarNavItem from '../sidebar-nav-item/index.vue';
import Button from '../../button/index.vue';
import CollapseButton from '../../collapse-button/index.vue';
import Icon from '../../icon/index.vue';
import List from '../../list/index.vue';
import ListItem from '../../list-item/index.vue';
import ListItemSection from '../../list-item-section/index.vue';
import Vue from 'vue';

Vue.component(SidebarNav.name, SidebarNav);
Vue.component(SidebarNavItem.name, SidebarNavItem);
Vue.component(Button.name, Button);
Vue.component(CollapseButton.name, CollapseButton);
Vue.component(Icon.name, Icon);
Vue.component(List.name, List);
Vue.component(ListItem.name, ListItem);
Vue.component(ListItemSection.name, ListItemSection);

describe('Sidebar', () => {
  it('should match snapshot', () => {
    const wrapper = mount(Sidebar);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        className: 'testClassName'
      }
    });

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should add customized wrapper class name if wrapperClass prop is set', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        wrapperClass: 'testClassName'
      }
    });

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = shallowMount(Sidebar, {
      slots: {
        default: `<div class='dummy-children'>Dummy Children</div>`
      }
    });

    expect(wrapper.find('.dummy-children').exists()).toBeTruthy();
  });

  it('should add customized theme name if theme prop is set', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        theme: 'dark'
      }
    });

    expect(wrapper.find('.md-sidebar--dark').exists()).toBeTruthy();
  });

  it('should minimize Sidebar if the collapsable/!expanded/withIcons are set', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        collapsable: true,
        expanded: false,
      }
    });

    expect(wrapper.find('.md-sidebar--minimized').exists()).toBeTruthy();
  });

  it('should collapse Sidebar if the collapsable/!expanded/!withIcons', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        collapsable: true,
        expanded: false,
        withIcons: false,
      }
    });

    expect(wrapper.find('.md-sidebar--collapsed').exists()).toBeTruthy();
  });

  it('should show Sidebar if the collapsable and expanded are set', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        collapsable: true,
        expanded: true,
      }
    });

    expect(wrapper.find('.md-sidebar--collapsed').exists()).toBeFalsy();
  });

  it('should add fixed if isFixed prop is set', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        isFixed: true,
      }
    });

    expect(wrapper.find('.md-sidebar__wrapper--fixed').exists()).toBeTruthy();
    expect(wrapper.find('.md-sidebar--fixed').exists()).toBeTruthy();
  });

  it('should not add nested class if it has icons and no tiers in children', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        isFixed: true,
      }
    });

    expect(wrapper.find('.md-sidebar--nested').exists()).toBeFalsy();
  });

  it('should add nested class if it has icons and secondary tiers in children', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        isFixed: true,
      }
    });
    wrapper.vm.sidebarLevels.secondary = true;

    expect(wrapper.find('.md-sidebar--nested').exists()).toBeTruthy();
  });

  it('should add nested class if it has icons and secondary tiers in children', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        isFixed: true,
      }
    });
    wrapper.vm.sidebarLevels.tertiary = true;

    expect(wrapper.find('.md-sidebar--nested').exists()).toBeTruthy();
  });

  it('should not have global class with isPageLevel true', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        isPageLevel: true,
      }
    });

    expect(wrapper.find('.md-sidebar--global').exists()).toBeFalsy();
  });

  it('should add indented class if withIcons is true', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        withIcons: true,
      }
    });

    expect(wrapper.find('.md-sidebar--indented').exists()).toBeTruthy();
  });

  it('should add indented class if withIcons=(true), isPageLevel=(true)', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        withIcons: true,
        isPageLevel: true,
      }
    });

    expect(wrapper.find('.md-sidebar--indented').exists()).toBeFalsy();
  });

  it('should add topbar class if withTopbar is true', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        withTopbar: true,
      }
    });

    expect(wrapper.find('.md-sidebar--topbar').exists()).toBeTruthy();
  });

  it('should have nested class if nested SidebarItems', () => {
    const wrapper = mount(Sidebar, {
      slots: {
        default: `<md-sidebar-nav>
  <md-sidebar-nav-item>
    <md-sidebar-nav-item />
  </md-sidebar-nav-item>
</md-sidebar-nav>`,
      }
    });

    expect(wrapper.find('.md-sidebar--nested').exists()).toBeTruthy();
  });

  it('should add toggle button if withToggle is true', () => {
    const wrapper = shallowMount(Sidebar, {
      propsData: {
        withToggle: true,
      }
    });

    expect(wrapper.find('.md-sidebar__toggle').exists()).toBeTruthy();
  });

  it('should not add toggle button if withToggle is false', () => {
    const wrapper = shallowMount(Sidebar);

    expect(wrapper.find('.md-sidebar__toggle').exists()).toBeFalsy();
  });

  it('should add minimized toggle button if withIcons/withToggle/!expanded set', () => {
    const wrapper = mount(Sidebar, {
      propsData: {
        withIcons: true,
        withToggle: true,
        expanded: false,
      }
    });

    expect(wrapper.find('.md-sidebar__toggle--minimized').exists()).toBeTruthy();
  });

  it('should add collapsed toggle button if !withIcons/withToggle/!expanded set', () => {
    const wrapper = mount(Sidebar, {
      propsData: {
        withIcons: false,
        withToggle: true,
        expanded: false,
      }
    });

    expect(wrapper.find('.md-sidebar__toggle--collapsed').exists()).toBeTruthy();
  });

  it('should apply buttonProps to toggle button', () => {
    const wrapper = mount(Sidebar, {
      propsData: {
        withToggle: true,
        buttonProps: {
          'aria-label': 'test'
        },
      }
    });

    expect(wrapper.find('.md-button').attributes('aria-label')).toEqual('test');
  });
});

