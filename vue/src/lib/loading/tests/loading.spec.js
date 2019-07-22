import { shallowMount } from '@vue/test-utils';
import Loading from '../index.vue';

describe('Loading', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(Loading);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render 3 span children', () => {
    const wrapper = shallowMount(Loading);
    const spans = wrapper.findAll('span');
    expect(spans.length).toBe(3);
    for (let i=0; i<3; i++) {
      expect(spans.at(i).classes('md-loading__icon')).toBe(true);
    }
  });

});

