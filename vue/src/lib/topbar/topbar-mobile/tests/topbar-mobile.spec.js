import { mount, shallowMount } from '@vue/test-utils';
import TopbarMobile from '../index.vue';
import Button from '../../../button/index.vue';
import Icon from '../../../icon/index.vue';
import ListSeparator from '../../../list-separator/index.vue';
import Vue from 'vue';

Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);
Vue.component(ListSeparator.name, ListSeparator);

describe('TopbarMobile', () => {
  it('should match snapshot', () => {
    const container = mount(TopbarMobile, {
      propsData: {
        id: 'test'
      }
    });
    expect(container.html()).toMatchSnapshot();
  });

  it('should render one TopbarMobile', () => {
    const container = shallowMount(TopbarMobile);

    expect(container.findAll('.md-top-bar__mobile').length).toEqual(1);
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallowMount(TopbarMobile, {
      propsData: {
        class: 'testClassName'
      }
    });

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children', () => {
    const container = shallowMount(TopbarMobile, {
      slots: {
        default: '<div class="testingforTbM" />'
      }
    });

    expect(
      container.findAll('.testingforTbM').length).toEqual(1);
  });

  it('should handle open', () => {
    const container = mount(
      TopbarMobile
    );

    expect(container.vm.isMobileOpen).toEqual(false);
    container.findAll(Icon).at(0).trigger('click');
    expect(container.vm.isMobileOpen).toEqual(true);
  });

  it('should handle close', () => {
    const container = mount(
      TopbarMobile
    );

    container.vm.isMobileOpen = true;
    expect(container.vm.isMobileOpen).toEqual(true);
    container.find(Icon).trigger('click');
    expect(container.vm.isMobileOpen).toEqual(false);
  });

  it('should not handle keydown close if not space or enter', () => {
    const container = mount(
      TopbarMobile
    );

    container.vm.isMobileOpen = true;
    expect(container.vm.isMobileOpen).toEqual(true);
    container.find('.md-top-bar__mobile').trigger('keydown', { charCode: 40 });
    expect(container.vm.isMobileOpen).toEqual(true);
  });

  it('should handle keydown close on space or enter', () => {
    const container = mount(
      TopbarMobile
    );

    container.vm.isMobileOpen = true;
    expect(container.vm.isMobileOpen).toEqual(true);
    container.find('.md-top-bar__mobile').trigger('keydown', { charCode: 32 });
    expect(container.vm.isMobileOpen).toEqual(false);

    container.vm.isMobileOpen = true;
    expect(container.vm.isMobileOpen).toEqual(true);
    container.find('.md-top-bar__mobile').trigger('keydown', { charCode: 13 });
    expect(container.vm.isMobileOpen).toEqual(false);
  });

  it('should pass down handleClose to children if shouldCloseOnClick is false', () => {
    const container = mount(TopbarMobile, {
      propsData: {
        shouldCloseOnClick: false
      },
      slots: {
        default: '<button class="testButton"/>'
      }
    });

    container.vm.isMobileOpen = true;
    container.find('.testButton').trigger('click');
    expect(container.vm.isMobileOpen).toEqual(false);
  });
});

