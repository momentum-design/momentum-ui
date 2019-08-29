import { mount } from '@vue/test-utils';
import ListItemHeader from '../index.vue';
import ListItem from '../../list-item/index.vue';
import ListItemSection from '../../list-item-section/index.vue';
import Vue from 'vue';

Vue.component(ListItem.name, ListItem);
Vue.component(ListItemSection.name, ListItemSection);

describe('ListItemHeader', () => {
  it('should match snapshot', () => {
    const wrapper = mount(ListItemHeader, {
      propsData: {
        header: 'header'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render children', () => {
    const wrapper = mount(ListItemHeader, {
      propsData: {
        header: 'header'
      },
      slots: {
        default: '<div class="test">Test</div>'
      }
    });

    expect(wrapper.findAll('.test').length).toEqual(1);
  });

  it('should render one ListItemHeader', () => {
    const wrapper = mount(ListItemHeader, {
      propsData: {
        header: 'header'
      }
    });

    expect(wrapper.classes('md-list-item-header')).toEqual(true);
  });

  it('should handle isReadOnly prop', () => {
    const wrapper = mount(ListItemHeader, {
      propsData: {
        header: 'header',
        isReadOnly: true
      }
    });

    expect(wrapper.props().isReadOnly).toEqual(true);
  });

  it('should allow children to be clicked on', () => {
    let count = 0;
    const clickableNode = '<div class="testClick" role="button" @click="onClickFn" @keydown="onClickFn" tabindex="0"/>';
    const wrapper = mount(ListItemHeader, {
      propsData: {
        header: 'Testing'
      },
      slots: {
        default: clickableNode
      },
      mocks: {
        onClickFn: () => { count++; }
      }
    });

    wrapper.find('.testClick').trigger('click');
    expect(count).toEqual(1);
  });

  it('should handle type prop', () => {
    const wrapper = mount(ListItemHeader, {
      propsData: {
        type: 'space',
        header: 'header'
      }
    });

    expect(wrapper.find('.md-list-item-header--space').exists()).toEqual(true);
  });

  it('should handle className prop', () => {
    const wrapper = mount(ListItemHeader, {
      propsData: {
        class: 'menuItem',
        header: 'header'
      }
    });

    expect(wrapper.classes('menuItem')).toEqual(true);
  });

  it('should handle header prop', () => {
    const wrapper = mount(ListItemHeader, {
      propsData: {
        header: 'header'
      }
    });

    expect(wrapper.find('.md-list-item__header').text()).toEqual('header');
  });

  it('should pass props to ListItem', () => {
    const wrapper = mount(ListItemHeader, {
      propsData: {
        header: 'header',
        separator: true
      }
    });

    expect(wrapper.classes('md-list-item--separator')).toEqual(true);
  });

  describe('tests for title Prop', () => {
    it('should handle title prop', () => {
      const wrapper = mount(ListItemHeader, {
        propsData: {
          header: 'header',
          title: 'testTitle'
        }
      });

      expect(wrapper.attributes().title).toEqual('testTitle');
    });

    it('should handle title if header is string', () => {
      const wrapper = mount(ListItemHeader, {
        propsData: {
          header: 'testTitle'
        }
      });

      expect(wrapper.attributes().title).toEqual('testTitle');
    });
  });
});

