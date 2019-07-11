import { shallowMount } from '@vue/test-utils';
import Badge from '../index.vue';

describe('Badge', () => {

  it('should match snapshot', () => {
    const wrapper = shallowMount(Badge);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render one Child Div', () => {
    const wrapper = shallowMount(Badge, {
      slots: { default: '<div>Test</div>' }
    });
    expect(wrapper.find('div').contains('div')).toBe(true);
    expect(wrapper.find('div').text()).toBe('Test');
  });

  it('should assign conditional rounded class name', () => {
    const wrapper = shallowMount(Badge, {
      propsData: { rounded: true }
    });
    expect(wrapper.find('div').classes('md-badge--round')).toBe(true);
  });

  it('should not assign conditional rounded class name', () => {
    const wrapper = shallowMount(Badge);
    expect(wrapper.find('div').classes('md-badge--round')).toBe(false);
  });

  it('should assign conditional color class name', () => {
    const wrapper = shallowMount(Badge, {
      propsData: { color: 'blue' }
    });
    expect(wrapper.find('div').classes('md-badge--blue')).toBe(true);
  });

  it('should not assign conditional color class name', () => {
    const wrapper = shallowMount(Badge);
    expect(wrapper.find('div').classes('md-badge--blue')).toBe(false);
  });

});
