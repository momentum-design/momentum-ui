import { mount } from '@vue/test-utils';
import AlertBanner from '../index.vue';
import Icon from '../../icon/index.vue';
import Vue from 'vue';

Vue.component(Icon.name, Icon);

describe('AlertBanner', () => {
  it('should match snapshot', () => {
    const wrapper = mount(AlertBanner, {
      propsData: {
        show: true
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should pass class prop', () => {
    const wrapper = mount(AlertBanner, {
      propsData: {
        show: true
      },
      attrs: {
        class: 'testing'
      }
    });

    expect(wrapper.find('.testing').exists()).toEqual(true);
    expect(wrapper.classes('testing')).toEqual(true);
  });

  it('should pass closeBtnProps', () => {
    const wrapper = mount(AlertBanner, {
      propsData: {
        show: true,
        closable: true,
        closeBtnProps: { 'aria-label': 'test' }
      },
    });

    expect(wrapper.find('.md-alert-banner__close').attributes()['aria-label']).toEqual('test');
  });

  it('should pass otherProps to wrapper', () => {
    const wrapper = mount(AlertBanner, {
      propsData: {
        show: true,
        closable: true,
        closeBtnProps: { 'aria-label': 'test' }
      },
      attrs: {
        id: 'testid'
      }
    });

    expect(wrapper.find('#testid').exists()).toEqual(true);
  });

  it('should default to type "info"', () => {
    const wrapper = mount(AlertBanner, {
      propsData: {
        show: true,
      },
    });

    expect(wrapper.find('.md-alert-banner--info').exists()).toEqual(true);
  });

  it('should show type "warning"', () => {
    const wrapper = mount(AlertBanner, {
      propsData: {
        show: true,
        type: 'warning'
      },
    });

    expect(wrapper.find('.md-alert-banner--warning').exists()).toEqual(true);
  });

  it('should not display closable button by default', () => {
    const wrapper = mount(AlertBanner, {
      propsData: {
        show: true,
      },
      slots: {
        default: '<div>Test</div>'
      }
    });

    expect(wrapper.find('.md-alert-banner__close').exists()).toEqual(false);
  });

  it('should display closable button if prop set to true', () => {
    const wrapper = mount(AlertBanner, {
      propsData: {
        show: true,
        closable: true,
      },
    });

    expect(wrapper.find('.md-alert-banner__close').exists()).toEqual(true);
  });

  it('should close the banner on click of close button', () => {
    const onClose = jest.fn();

    const wrapper = mount(AlertBanner, {
      propsData: {
        show: true,
        closable: true,
      },
      listeners: {
        hide: onClose
      }
    });

    wrapper.find('.md-alert-banner__close').trigger('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should close the banner on keydown of Space', () => {
    const onClose = jest.fn();

    const wrapper = mount(AlertBanner, {
      propsData: {
        show: true,
        closable: true,
      },
      listeners: {
        hide: onClose
      }
    });

    wrapper.find('.md-alert-banner__close').trigger('keydown.space');
    expect(onClose).toHaveBeenCalled();
  });

  it('should close the banner on keydown of Enter', () => {
    const onClose = jest.fn();

    const wrapper = mount(AlertBanner, {
      propsData: {
        show: true,
        closable: true,
      },
      listeners: {
        hide: onClose
      }
    });

    wrapper.find('.md-alert-banner__close').trigger('keydown.enter');
    expect(onClose).toHaveBeenCalled();
  });

  it('should do nothing on keydown of letter d', () => {
    const onClose = jest.fn();

    const wrapper = mount(AlertBanner, {
      propsData: {
        show: true,
        closable: true,
      },
      listeners: {
        hide: onClose
      }
    });

    wrapper.find('.md-alert-banner__close').trigger('keydown', { key: 'd' });
    expect(onClose).toHaveBeenCalledTimes(0);
  });

  it('should pass onKeyDownClose function', () => {
    const onKeyDown = jest.fn();

    const wrapper = mount(AlertBanner, {
      propsData: {
        show: true,
        closable: true,
      },
      listeners: {
        keydown: onKeyDown
      }
    });

    wrapper.find('.md-alert-banner__close').trigger('keydown', { key: 'd' });
    expect(onKeyDown).toHaveBeenCalled();
  });

});
