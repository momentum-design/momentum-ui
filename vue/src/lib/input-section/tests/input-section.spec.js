import { shallowMount } from '@vue/test-utils';
import InputSection from '../index.vue';

describe('InputSection', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(InputSection);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render input section with position class', () => {
    const wrapper = shallowMount(InputSection);

    expect(wrapper.find('.md-input__before').exists()).toEqual(true);
  });

  it('should render input section with position prop', () => {
    const wrapper = shallowMount(InputSection, {
      propsData: {
        position: 'after'
      }
    });

    expect(wrapper.find('.md-input__after').exists()).toEqual(true);
  });

  it('should render className if prop is passed', () => {
    const wrapper = shallowMount(InputSection, {
      attrs: {
        class: 'class-test'
      }
    });

    expect(wrapper.find('.class-test').exists()).toEqual(true);
  });

  it('should render children', () => {
    const wrapper = shallowMount(InputSection, {
      slots: {
        default: 'test'
      }
    });

    expect(wrapper.find('.md-input__before').text()).toEqual('test');
  });

  it('should pass otherProps to wrapper', () => {
    const wrapper = shallowMount(InputSection, {
      propsData: {
        id: 'testid'
      }
    });

    expect(wrapper.find('#testid').exists()).toEqual(true);
  });
});

