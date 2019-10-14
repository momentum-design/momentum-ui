import { shallowMount } from '@vue/test-utils';
import Link from '../index.vue';

describe('Link', () => {
  it('should match snapshot', () => {
    const container = shallowMount(Link, {
      slots: {
        default: `<div class="child" />`
      }
    });
    expect(container.html()).toMatchSnapshot();
  });

  it('should render class if prop is passed', () => {
    const container = shallowMount(Link, {
      attrs: {
        class: 'dark'
      },
      slots: {
        default: `<div class="child" />`
      }
    });

    expect(container.find('.dark').exists()).toBeTruthy();
  });


  it('should render color if prop is passed', () => {
    const container = shallowMount(Link, {
      propsData: {
        color: 'green'
      },
      slots: {
        default: `<div class="child" />`
      }
    });

    expect(container.find('.md-link--green').exists()).toBeTruthy();
  });

  it('should render theme if prop is passed', () => {
    const container = shallowMount(Link, {
      propsData: {
        theme: 'dark'
      },
      slots: {
        default: `<div class="child" />`
      }
    });

    expect(container.find('.md-link--dark').exists()).toBeTruthy();
  });

  it('should render disabled if prop is passed', () => {
    const container = shallowMount(Link, {
      propsData: {
        disabled: true
      },
      slots: {
        default: `<div class="child" />`
      }
    });

    expect(container.attributes().disabled).toEqual('disabled');
  });


  it('should render children', () => {
    const container = shallowMount(Link, {
      slots: {
        default: `<div class="child" />`
      }
    });

    expect(container.find('.child').exists()).toBeTruthy();
  });
});

