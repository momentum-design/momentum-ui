import { mount } from '@vue/test-utils';
import InputMessage from '../index.vue';

describe('InputMessage', () => {
  it('should match snapshot', () => {
    const wrapper = mount(InputMessage, {
      propsData: {
        message: 'test'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match render message with rendered text', () => {
    const wrapper = mount(InputMessage, {
      propsData: {
        message: 'test'
      }
    });

    expect(wrapper.find('.md-input__message').text()).toEqual('test');
  });
});

