import { mount } from '@vue/test-utils';
import SidebarNavItem from '../index.vue';

import Icon from '../../../icon/index.vue';
import List from '../../../list/index.vue';
import ListItem from '../../../list-item/index.vue';
import ListItemSection from '../../../list-item-section/index.vue';
import Vue from 'vue';

Vue.component(Icon.name, Icon);
Vue.component(List.name, List);
Vue.component(ListItem.name, ListItem);
Vue.component(ListItemSection.name, ListItemSection);

describe('SidebarNavItem', () => {
  it('should match snapshot', () => {
    const wrapper = mount(SidebarNavItem, {
      propsData: {
        label: 'one'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = mount(SidebarNavItem, {
      propsData: {
        className: 'testClassName'
      }
    });

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = mount(SidebarNavItem, {
      slots: {
        default: `<div class='dummy-children'>Dummy Children</div>`
      }
    });

    expect(wrapper.find('.dummy-children').exists()).toBeTruthy();
  });

  it('should have expanded class if children present and expanded', () => {
    const wrapper = mount(SidebarNavItem, {
      propsData: {
        expanded: true
      },
      slots: {
        default: `<div class='dummy-children'>Dummy Children</div>`
      }
    });

    expect(wrapper.find('.md-sidebar-nav__group--expanded').exists()).toBeTruthy();
  });

  it('should expand if children present and header list item is clicked', () => {
    const wrapper = mount(SidebarNavItem, {
      slots: {
        default: `<div class='dummy-children'>Dummy Children</div>`
      }
    });

    expect(wrapper.find('.md-sidebar-nav__group--collapsed').exists()).toBeTruthy();

    wrapper.find(ListItem).trigger('click');

    expect(wrapper.find('.md-sidebar-nav__group--expanded').exists()).toBeTruthy();
  });

  it('should allow titleNode to be passed', () => {
    const wrapper = mount(SidebarNavItem, {
      slots: {
        title: `<div class='dummy-title'>Dummy Title</div>`
      }
    });

    expect(wrapper.find('.dummy-title').exists()).toBeTruthy();
  });

  it('should pass onClick to titleNode', () => {
    const wrapper = mount(SidebarNavItem, {
      slots: {
        default: `<div class='dummy-children'>Dummy Children</div>`,
        title: `<div class='dummy-title'>Dummy Title</div>`
      }
    });

    expect(wrapper.find('.md-sidebar-nav__group--collapsed').exists()).toBeTruthy();

    wrapper.find('.dummy-title').trigger('click');

    expect(wrapper.find('.md-sidebar-nav__group--expanded').exists()).toBeTruthy();
  });

  it('should allow icon to be passed as a string', () => {
    const wrapper = mount(SidebarNavItem, {
      propsData: {
        icon: 'arrow-up'
      }
    });

    expect(wrapper.find('.icon-arrow-up_16').exists()).toBeTruthy();
  });

  it('should force icon to size 16 by default', () => {
    const wrapper = mount(SidebarNavItem, {
      propsData: {
        icon: 'arrow-up_12'
      }
    });

    expect(wrapper.find('.icon-arrow-up_16').exists()).toBeTruthy();
  });

  it('should force icon to size 20 when secondary prop is present', () => {
    const wrapper = mount(SidebarNavItem, {
      provide: {
        secondary: true
      },
      propsData: {
        icon: 'arrow-up_12'
      }
    });

    expect(wrapper.find('.icon-arrow-up_20').exists()).toBeTruthy();
  });

  it('should allow icon as a slot', () => {
    const wrapper = mount(SidebarNavItem, {
      slots: {
        icon: `<div class='dummy-icon'>Icon</div>`
      },
    });

    expect(wrapper.find('.dummy-icon').exists()).toBeTruthy();
  });

  it('should handle title prop', () => {
    const container = mount(SidebarNavItem, {
      propsData: {
        title: 'testTitle'
      }
    });

    expect(container.find('.md-list-item__center').text()).toEqual('testTitle');
  });

  describe('test for internal level prop', () => {
    it('should be primary by default', () => {
      const container = mount(SidebarNavItem, {
        provide: {
          level: null
        },
        slots: {
          default: `<div>test</div>`
        }
      });

      expect(container.find('.md-sidebar-nav__group--secondary').exists()).toBeTruthy();
    });

    it('should apply secondary if primary exists', () => {
      const container = mount(SidebarNavItem, {
        provide: {
          level: 'primary'
        },
        slots: {
          default: `<div>test</div>`
        }
      });

      expect(container.find('.md-sidebar-nav__group--secondary').exists()).toBeTruthy();
    });

    it('should apply tertiary if secondary exists', () => {
      const container = mount(SidebarNavItem, {
        provide: {
          level: 'secondary'
        },
        slots: {
          default: `<div>test</div>`
        }
      });

      expect(container.find('.md-sidebar-nav__group--tertiary').exists()).toBeTruthy();
    });
  });
});

