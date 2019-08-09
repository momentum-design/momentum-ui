import { mount } from '@vue/test-utils';
import ListSeparator from '../index.vue';

describe('ListSeparator', () => {
  it('should match snapshot', () => {
    const wrapper = mount(ListSeparator);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render one ListSeparator', () => {
    const wrapper = mount(ListSeparator);
    expect(wrapper.classes('md-list-separator')).toBeTruthy();
  });

  it('should render text prop', () => {
    const wrapper = mount(ListSeparator, {
      propsData: {
        text: 'Today'
      }
    });

    expect(wrapper.findAll('.md-list-separator__text').length).toEqual(1);
    expect(wrapper.find('.md-list-separator__text').text()).toEqual('Today');
  });

  it('should change the line color', () => {
    const wrapper = mount(ListSeparator, {
      propsData: {
        lineColor: 'red'
      }
    });

    expect(wrapper.attributes().style).toEqual('color: red;');
  });

  it('should add padding to the text prop', () => {
    const wrapper = mount(ListSeparator, {
      propsData: {
        text: 'Today',
        textPadding: '40px'
      }
    });

    expect(wrapper.find('.md-list-separator__text').attributes().style).toEqual('padding: 40px;');
  });

  it('should change the text color', () => {
    const wrapper = mount(ListSeparator, {
      propsData: {
        text: 'Today',
        textColor: 'green'
      }
    });

    expect(wrapper.find('.md-list-separator__text').attributes().style).toEqual('color: green;');
  });

  it('should handle class prop', () => {
    const wrapper = mount(ListSeparator, {
      propsData: {
        class: 'right'
      }
    });

    expect(wrapper.findAll('.right').length).toEqual(1);
  });

  it('should render children', () => {
    const wrapper = mount(ListSeparator, {
      slots: {
        default: '<div>Test</div>'
      }
    });
    expect(wrapper.element.__vue__.$children.length).toEqual(1);
  });
});

