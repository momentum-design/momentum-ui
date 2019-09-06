import { mount } from '@vue/test-utils';
import CloseIcon from '../index.vue';

describe('CloseIcon', () => {
  it('should match snapshot', () => {
    const wrapper = mount(CloseIcon);
    expect(wrapper.html()).toMatchSnapshot();
  });
});

