import { shallowMount } from '@vue/test-utils';
import InputError from '../index.vue';

describe('InputError', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(InputError, {
      propsData: {
        error: 'test'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match render error with rendered text', () => {
    const container = shallowMount(InputError, {
      propsData: {
        error: 'test'
      }
    });

    expect(container.find('.message').text()).toEqual('test');
  });
});

