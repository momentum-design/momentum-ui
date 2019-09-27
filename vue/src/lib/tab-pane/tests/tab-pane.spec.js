import { mount } from '@vue/test-utils';
import TabPane from '../index.vue';

describe('TabPane', () => {
  it('should match snapshot', () => {
    const container = mount(TabPane);
    expect(container.html()).toMatchSnapshot();
  });

  it('should render one TabPane', () => {
    const container = mount(TabPane);

    expect(container.findAll('.md-tab__pane').length).toEqual(1);
  });

  it('should render inactive by default', () => {
    const container = mount(TabPane);

    expect(container.find('.md-tab__pane').classes('active')).toEqual(false);
  });

  it('should render active when passed', () => {
    const container = mount(TabPane, {
      propsData: {
        active: true
      }
    });

    expect(container.find('.md-tab__pane').classes('active')).toEqual(true);
  });

  it('should render children', () => {
    const container = mount(TabPane, {
      slots: {
        default: `<div class="testingforTP" />`
      }
    });

    expect(container.findAll('.testingforTP').length).toEqual(1);
  });
});

