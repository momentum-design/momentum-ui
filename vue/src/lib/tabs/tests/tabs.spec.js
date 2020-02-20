import { mount, shallowMount } from '@vue/test-utils';
import Tabs from '../index.vue';
import Tab from '../tab/index.vue';
import TabContent from '../tab-content/index.vue';
import TabList from '../tab-list/index.vue';
import TabPane from '../tab-pane/index.vue';
import Vue from 'vue';

Vue.component(Tab.name, Tab);
Vue.component(TabContent.name, TabContent);
Vue.component(TabList.name, TabList);
Vue.component(TabPane.name, TabPane);

describe('Tabs', () => {
  it('should match snapshot', () => {
    const container = mount(Tabs, {
      slots: {
        default: `<div />`
      }
    });
    expect(container.html()).toMatchSnapshot();
  });

  it('should render one Tabs', () => {
    const container = mount(Tabs, {
      slots: {
        default: `<div />`
      }
    });

    expect(container.findAll('div').length).toEqual(2);
  });

  it('should render tabType prop (pills)', () => {
    const container = mount(Tabs, {
      slots: {
        default: `<md-tab-list>
        <md-tab heading='First Tab'/>
      </md-tab-list>
      <md-tab-content>
        <md-tab-pane>
          First tab pane
        </md-tab-pane>
      </md-tab-content>`
      }
    });

    expect(container.find('.md-tab').classes('md-tab--pills')).toEqual(true);
  });

  it('should render justified prop', () => {
    const container = mount(Tabs, {
      propsData: {
        justified: true
      },
      slots: {
        default: `<md-tab-list>
        <md-tab heading='First Tab'/>
      </md-tab-list>
      <md-tab-content>
        <md-tab-pane>
          First tab pane
        </md-tab-pane>
      </md-tab-content>`
      }
    });

    expect(container.find('.md-tab').classes('md-tab--justified')).toEqual(true);
  });

  it('should handle onSelect event', () => {
    let count = 0;
    const countUp = () => count++;

    const container = mount(Tabs, {
      propsData: {
      },
      listeners: {
        select: countUp
      },
      slots: {
        default: `<md-tab-list>
        <md-tab class="clickMe" heading='test'/>
        <md-tab class="clickMe2" heading='test'/>
      </md-tab-list>
      <md-tab-content>
        <md-tab-pane>Hi</md-tab-pane>
        <md-tab-pane>Hi</md-tab-pane>
      </md-tab-content>`
      }
    });

    container.findAll('.clickMe > a').at(0).trigger('click');
    expect(count).toEqual(0);

    container.findAll('.clickMe2 > a').at(0).trigger('click');
    expect(count).toEqual(1);
  });

  it('should use focusIndex to focus onLoad', () => {
    const container = mount(Tabs, {
      propsData: {
        focus: 0
      },
      slots: {
        default: `<md-tab-list>
        <md-tab class="one" heading='test1'/>
        <md-tab class="two" heading='test2'/>
      </md-tab-list>
      <md-tab-content>
        <md-tab-pane>1</md-tab-pane>
        <md-tab-pane>2</md-tab-pane>
      </md-tab-content>`
      }
    });

    expect(container.findAll('.one.active').length).toEqual(1);
  });

  it('when focused index is disabled', () => {
    const container = mount(Tabs, {
      propsData: {
        focus: 0
      },
      slots: {
        default: `<md-tab-list>
        <md-tab class="one" :disabled="true" heading='test'/>
      </md-tab-list>
      <md-tab-content>
        <md-tab-pane>Hi</md-tab-pane>
      </md-tab-content>`
      }
    });

    expect(container.findAll('.one.active').length).toEqual(0);
    expect(container.vm.focusIndex).toEqual(null);
  });

});
