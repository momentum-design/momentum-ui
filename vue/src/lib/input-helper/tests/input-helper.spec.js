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

  it('should render input help with correct class', () => {
    const container = shallowMount(InputHelper, {
      propsData: {
        message: 'test'
      }
    });

    expect(container.find('p').classes('md-input__help-text')).toEqual(true);
  });

  it('should render message', () => {
    const container = shallowMount(InputHelper, {
      propsData: {
        message: 'test'
      }
    });

    expect(container.find('p').text()).toEqual('test');
  });
});

