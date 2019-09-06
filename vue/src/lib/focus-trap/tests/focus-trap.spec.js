import { shallowMount } from '@vue/test-utils';
import FocusTrap from '../index.vue';

describe('FocusTrap', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(FocusTrap, {
      propsData: {
        focusTrapOptions: {
          initialFocus: 'body'
        }
      },
      slots: {
        default: '<div />'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

