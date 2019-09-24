import { shallowMount } from '@vue/test-utils';
import InputHelper from '../index.vue';

describe('InputHelper', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(InputHelper, {
      propsData: {
        message: 'test'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render className if prop is passed', () => {
    const wrapper = shallowMount(InputHelper, {
      propsData: {
        message: 'test',
      },
      attrs: {
        class: 'class-test'
      }
    });

    expect(wrapper.find('.class-test').exists()).toEqual(true);
  });

  it('should render input help with correct class', () => {
    const wrapper = shallowMount(InputHelper, {
      propsData: {
        message: 'test'
      }
    });

    expect(wrapper.find('div').classes('md-input__help-text')).toEqual(true);
  });

  it('should render message', () => {
    const wrapper = shallowMount(InputHelper, {
      propsData: {
        message: 'test'
      }
    });

    expect(wrapper.find('div').text()).toEqual('test');
  });

  it('should pass otherProps to wrapper', () => {
    const wrapper = shallowMount(InputHelper, {
      propsData: {
        message: 'test',
        id: 'testid'
      }
    });

    expect(wrapper.find('#testid').exists()).toEqual(true);
  });
});

