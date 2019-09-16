import { mount } from '@vue/test-utils';
import Breadcrumbs from '../index.vue';

describe('Breadcrumbs', () => {
  it('should match snapshot', () => {
    const wrapper = mount(Breadcrumbs);
    expect(wrapper.html()).toMatchSnapshot();
  });
});

