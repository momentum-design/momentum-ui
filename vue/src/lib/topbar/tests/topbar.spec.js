import { mount } from '@vue/test-utils';
import Topbar from '../index.vue';
import TopbarNav from '../topbar-nav/index.vue';
import TopbarRight from '../topbar-right/index.vue';
import TopbarMobile from '../topbar-mobile/index.vue';
import Button from '../../button/index.vue';
import Icon from '../../icon/index.vue';
import ListSeparator from '../../list-separator/index.vue';
import Vue from 'vue';

Vue.component(TopbarNav.name, TopbarNav);
Vue.component(TopbarRight.name, TopbarRight);
Vue.component(TopbarMobile.name, TopbarMobile);
Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);
Vue.component(ListSeparator.name, ListSeparator);

describe('Topbar', () => {
  it('should match snapshot', () => {
    const container = mount(Topbar);
    expect(container.html()).toMatchSnapshot();
  });

  it('should apply fixed prop', () => {
    const container = mount(Topbar, {
      propsData: {
        fixed: true
      }
    });

    expect(container.find('.md-top-bar--fixed').exists()).toBeTruthy();
  });

  it('should apply color prop', () => {
    const container = mount(Topbar, {
      propsData: {
        color: 'light'
      }
    });

    expect(container.find('.md-top-bar--light').exists()).toBeTruthy();
  });

  it('should not apply null color prop', () => {
    const container = mount(Topbar, {
      propsData: {
        color: ''
      }
    });

    expect(container.find('.md-top-bar').attributes().class).toEqual('md-top-bar');
  });

  it('should apply brand brandAnchorElement class', () => {
    const container = mount(Topbar);

    expect(container.findAll('.md-brand').length).toEqual(1);
  });

  it('should handle brandAnchorElement prop with class', () => {
    const container = mount(Topbar, {
      slots: {
        brand: `<div class='testAnchor' />`
      }
    });
    expect(container.findAll('.testAnchor').length).toEqual(1);
  });

  it('should handle image prop', () => {
    const container = mount(Topbar, {
      slots: {
        image: `<img class='testimg' src='test.png' alt='test' />`
      }
    });

    expect(container.findAll('.testimg').length).toEqual(1);
  });

  it('should inject brandNode to TopbarMobile when brand slot not present', () => {
    const container = mount(Topbar, {
      slots: {
        default: `<md-topbar-mobile />`,
        brand: `<div class='testAnchor' />`
      }
    });

    expect(container.findAll('.testAnchor').length).toEqual(2);
  });

  it('should not inject brandNode to TopbarMobile when brand slot is present', () => {
    const container = mount(Topbar, {
      slots: {
        default: `<md-topbar-mobile><div class='testAnchor2' slot="brand"/></md-topbar-mobile>`,
        brand: `<div class='testAnchor1' />`
      }
    });

    expect(container.findAll('.testAnchor1').length).toEqual(1);
    expect(container.findAll('.testAnchor2').length).toEqual(1);
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = mount(Topbar, {
      propsData: {
        class: 'testClassName'
      }
    });

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });
});

