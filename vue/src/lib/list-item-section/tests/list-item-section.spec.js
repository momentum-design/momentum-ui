import { mount } from '@vue/test-utils';
import ListItemSection from '../index.vue';

describe('ListItemSection', () => {
  it('should match snapshot', () => {
    const wrapper = mount(ListItemSection);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render one ListItemSection', () => {
    const wrapper = mount(ListItemSection);

    expect(wrapper.findAll('.md-list-item__center').length).toEqual(1);
  });

  it('should handle position prop (left)', () => {
    const wrapper = mount(ListItemSection, {
      propsData: {
        position: 'left'
      }
    });

    expect(wrapper.findAll('.md-list-item__left').length).toEqual(1);
  });

  it('should handle position prop (right)', () => {
    const wrapper = mount(ListItemSection, {
      propsData: {
        position: 'right'
      }
    });

    expect(wrapper.findAll('.md-list-item__right').length).toEqual(1);
  });

  it('should handle class prop', () => {
    const wrapper = mount(ListItemSection, {
      propsData: {
        class: 'right'
      }
    });

    expect(wrapper.findAll('.right').length).toEqual(1);
  });

  it('should render children', () => {
    const wrapper = mount(ListItemSection, {
      slots: {
        default: '<div>Test</div>'
      }
    });

    expect(wrapper.element.__vue__.$children.length).toEqual(1);
  });
});

