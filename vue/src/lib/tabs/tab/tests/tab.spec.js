import { mount } from '@vue/test-utils';
import Tab from '../index.vue';

describe('Tab', () => {
  it('should match snapshot', () => {
    const container = mount(Tab, {
      propsData: {
        heading: 'test'
      }
    });
    expect(container.html()).toMatchSnapshot();
  });

  it('should render one Tab', () => {
    const container = mount(Tab, {
      propsData: {
        heading: 'test'
      }
    });

    expect(container.findAll('li').length).toEqual(1);
  });

  it('should render TabHeader based on tabType prop', () => {
    const container = mount(Tab, {
      propsData: {
        heading: 'test'
      }
    });

    expect(container.find('md-tab-heading').exists()).toEqual(false);
  });

  it('should not be active by default', () => {
    const container = mount(Tab, {
      propsData: {
        heading: 'test'
      }
    });

    expect(container.find('li').classes('active')).toEqual(false);
  });

  it('should pass active prop', () => {
    const container = mount(Tab, {
      propsData: {
        heading: 'test',
        active: true
      }
    });

    expect(container.find('li').classes('active')).toEqual(true);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(Tab, {
      propsData: {
        heading: 'test'
      },
      listeners: {
        click: countUp
      }
    });

    container.find('a').trigger('click');
    expect(count).toEqual(1);
  });
});

