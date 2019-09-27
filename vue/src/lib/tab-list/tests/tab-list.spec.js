import { mount } from '@vue/test-utils';
import TabList from '../index.vue';
import Tab from '../../tab/index.vue';
import Vue from 'vue';

Vue.component(Tab.name, Tab);

describe('TabList', () => {
  it('should match snapshot', () => {
    const wrapper = mount(TabList, {
      provide: {
        getActiveIndex: () => 0,
        getFocusIndex: () => 0,
        onFocus: () => {},
        onActivate: () => {}
      },
      slots: {
        default: `<md-tab heading="one"/>`
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render children', () => {
    const container = mount(TabList, {
      provide: {
        getActiveIndex: () => 0,
        getFocusIndex: () => 0,
        onFocus: () => {},
        onActivate: () => {}
      },
      slots: {
        default: `<md-tab heading="one"/>`
      }
    });

    expect(container.findAll('.md-tab__item').length).toEqual(1);
  });
});

