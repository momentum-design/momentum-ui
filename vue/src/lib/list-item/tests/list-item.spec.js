import { mount } from '@vue/test-utils';
import ListItem from '../index.vue';
import ListItemSection from '../../list-item-section/index.vue';
import Vue from 'vue';

Vue.component(ListItemSection.name, ListItemSection);

describe('ListItem', () => {
  it('should match snapshot', () => {
    const wrapper = mount(ListItem);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render one ListItem', () => {
    const wrapper = mount(ListItem);

    expect(wrapper.classes('md-list-item')).toEqual(true);
  });

  it('should handle class prop', () => {
    const wrapper = mount(ListItem, {
      propsData: {
        class: 'menuItem'
      }
    });

    expect(wrapper.classes('menuItem')).toEqual(true);
  });

  it('should handle role prop', () => {
    const wrapper = mount(ListItem, {
      propsData: {
        role: 'menuitem'
      }
    });

    expect(wrapper.attributes().role).toEqual('menuitem');
  });

  it('should handle type prop (small)', () => {
    const wrapper = mount(ListItem, {
      propsData: {
        type: 'small'
      }
    });

    expect(wrapper.classes('md-list-item--small')).toEqual(true);
  });

  it('should handle type prop (large)', () => {
    const wrapper = mount(ListItem, {
      propsData: {
        type: 'large'
      }
    });

    expect(wrapper.classes('md-list-item--large')).toEqual(true);
  });

  it('should render label', () => {
    const wrapper = mount(ListItem, {
      propsData: {
        link: 'large',
        label: 'large'
      }
    });

    expect(wrapper.text()).toEqual('large');
  });

  it('should handle link prop', () => {
    const wrapper = mount(ListItem, {
      propsData: {
        link: 'left'
      }
    });

    expect(wrapper.is('a')).toEqual(true);
  });

  it('should handle customAnchor slot', () => {
    const wrapper = mount(ListItem, {
      propsData: {
        link: 'left'
      },
      slots: {
        customAnchor: '<div class="testAnchor" />'
      }
    });

    expect(wrapper.classes('testAnchor')).toEqual(true);
  });

  it('should handle refName prop', () => {
    const wrapper = mount(ListItem, {
      propsData: {
        link: 'left',
        refName: 'testAnchor'
      }
    });

    expect(wrapper.vm.$el.tagName).toEqual('A');
  });

  it('should handle active prop', () => {
    const wrapper = mount(ListItem, {
      propsData: {
        link: 'left',
        refName: 'testAnchor',
        active: true
      }
    });

    expect(wrapper.classes('active')).toEqual(true);
  });

  it('should handle disabled prop', () => {
    const wrapper = mount(ListItem, {
      propsData: {
        link: 'left',
        refName: 'testAnchor',
        disabled: true
      }
    });

    expect(wrapper.classes('disabled')).toEqual(true);
  });

  it('should handle focus prop', () => {
    const wrapper = mount(ListItem, {
      propsData: {
        link: 'left',
        refName: 'testAnchor',
        focus: true
      }
    });

    expect(wrapper.attributes().tabindex).toEqual("0");
  });

  it('should handle separator prop', () => {
    const wrapper = mount(ListItem, {
      propsData: {
        link: 'left',
        separator: true
      }
    });

    expect(wrapper.classes('md-list-item--separator')).toEqual(true);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const wrapper = mount(ListItem, {
      propsData: {
        label: 'test',
        link: 'test'
      },
      listeners: {
        click: countUp
      }
    });

    wrapper.trigger('click');
    expect(count).toEqual(1);
  });

  it('should handle keyPress as onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const wrapper = mount(ListItem, {
      propsData: {
        label: 'test',
        link: 'test'
      },
      listeners: {
        keydown: countUp
      }
    });

    wrapper.trigger('keydown', {
      keyCode: 13
    });

    expect(count).toEqual(1);
  });

  it('should render children', () => {
    const wrapper = mount(ListItem, {
      slots: {
        default: '<span class="testChildren">Test</span>'
      }
    });

    expect(wrapper.find('span').classes('testChildren')).toEqual(true);
  });

  it('should handle null children', () => {

    const wrapper = mount(ListItem, {
      propsData: {
        type: 'large',
        title: 'List Item'
      },
      slots: {
        default: `<md-list-item-section position="left">Left</md-list-item-section>
<md-list-item-section position="right">Right</md-list-item-section>`
      }
    });

    expect(wrapper.findAll('.md-list-item').length).toEqual(1);
  });

  describe('tests for isReadOnly Props', () => {
    it('should add class for isReadOnly prop', () => {
      const wrapper = mount(ListItem, {
        propsData: {
          isReadOnly: true
        }
      });

      expect(wrapper.classes('md-list-item--read-only')).toEqual(true);
    });

    it('should not add click, keydown, or tabindex with isReadOnly prop', () => {
      const wrapper = mount(ListItem, {
        propsData: {
          isReadOnly: true
        }
      });

      expect(wrapper.vm.$listeners.click).toEqual(undefined);
      expect(wrapper.vm.$listeners.keydown).toEqual(undefined);
      expect(wrapper.attributes().tabindex).toEqual(undefined);
    });
  });

  describe('tests for title Prop', () => {
    it('should not have title by default', () => {
      const wrapper = mount(ListItem);

      expect(wrapper.attributes().title).toEqual(undefined);
    });

    it('should handle title prop', () => {
      const wrapper = mount(ListItem, {
        propsData: {
          title: 'testTitle'
        }
      });

      expect(wrapper.attributes().title).toEqual('testTitle');
    });

    it('should handle title if label present', () => {
      const wrapper = mount(ListItem, {
        propsData: {
          label: 'testTitle'
        }
      });

      expect(wrapper.attributes().title).toEqual('testTitle');
    });
  });

});

