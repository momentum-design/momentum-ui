import { shallowMount } from '@vue/test-utils';
import Sample from '../sample.vue';

describe('Sample', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(Sample);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
