import { shallowMount } from '@vue/test-utils';
import Label from '../index.vue';

describe('Label', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(Label, {
      propsData: {
        htmlFor: 'test',
        label: 'testLabel'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have HTML for attribute', () => {
    const wrapper = shallowMount(Label, {
      propsData: {
        htmlFor: 'test',
        label: 'testLabel'
      }
    });

    expect(wrapper.find('label').attributes().for).toEqual('test');
  });

  it('should render label', () => {
    const wrapper = shallowMount(Label, {
      propsData: {
        htmlFor: 'test',
        label: 'testLabel'
      }
    });

    expect(wrapper.find('span').text()).toEqual('testLabel');
  });

  it('should apply dark theme class', () => {
    const wrapper = shallowMount(Label, {
      propsData: {
        htmlFor: 'test',
        label: 'testLabel',
        theme: 'dark'
      }
    });

    expect(wrapper.classes('md-label--dark')).toBe(true);
  });
});
