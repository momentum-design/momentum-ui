import { shallowMount, mount } from '@vue/test-utils';
import Modal from '../index.vue';
import AriaModal from '../../aria-modal/index.vue';
import FocusTrap from '../../focus-trap/index.vue';
import Vue from 'vue';

Vue.component(AriaModal.name, AriaModal);
Vue.component(FocusTrap.name, FocusTrap);

describe('Modal', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        applicationId: 'test',
        show: true,
        htmlId: 'testModal'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a Modal', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        applicationId: 'test',
        show: true,
        htmlId: 'testModal'
      },
      listeners: {
        hide: () => { }
      }
    });

    expect(wrapper.vm.$children.length).toEqual(1);
  });

  it('should not render without Show Prop equaling true', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        applicationId: 'test',
        show: false,
        htmlId: 'testModal'
      },
      listeners: {
        hide: () => { }
      }
    });

    expect(wrapper.vm.$children.length).toEqual(0);
  });

  it('should render based on size prop', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        applicationId: 'test',
        show: true,
        htmlId: 'testModal'
      },
      listeners: {
        hide: () => { }
      }
    });

    expect(wrapper.findAll('.md-modal__content').length).toEqual(1);
    expect(wrapper.attributes('dialogclass')).toContain('md-modal--default');
  });

  it('should render based on size prop (small)', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        applicationId: 'test',
        show: true,
        htmlId: 'testModal',
        size: 'small'
      },
      listeners: {
        hide: () => { }
      }
    });

    expect(wrapper.findAll('.md-modal__content').length).toEqual(1);
    expect(wrapper.attributes('dialogclass')).toContain('md-modal--small');
  });

  it('should render based on size prop (medium)', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        applicationId: 'test',
        show: true,
        htmlId: 'testModal',
        size: 'medium'
      },
      listeners: {
        hide: () => { }
      }
    });

    expect(wrapper.findAll('.md-modal__content').length).toEqual(1);
    expect(wrapper.attributes('dialogclass')).toContain('md-modal--medium');
  });

  it('should render based on size prop (large)', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        applicationId: 'test',
        show: true,
        htmlId: 'testModal',
        size: 'large'
      },
      listeners: {
        hide: () => { }
      }
    });

    expect(wrapper.findAll('.md-modal__content').length).toEqual(1);
    expect(wrapper.attributes('dialogclass')).toContain('md-modal--large');
  });

  it('should render based on background prop', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        applicationId: 'test',
        show: true,
        htmlId: 'testModal',
      },
      listeners: {
        hide: () => { }
      }
    });

    expect(wrapper.findAll('.reveal-modal-bg').length).toEqual(0);
  });

  it('should render based on size prop (dialog)', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        applicationId: 'test',
        show: true,
        htmlId: 'testModal',
        size: 'dialog'
      },
      listeners: {
        hide: () => { }
      }
    });

    expect(wrapper.findAll('.md-modal__content').length).toEqual(1);
    expect(wrapper.attributes('dialogclass')).toContain('md-modal--dialog');
  });

  it('should render based on size prop (full)', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        applicationId: 'test',
        show: true,
        htmlId: 'testModal',
        size: 'full'
      },
      listeners: {
        hide: () => { }
      }
    });

    expect(wrapper.findAll('.md-modal__content').length).toEqual(1);
    expect(wrapper.attributes('dialogclass')).toContain('md-modal--full');
  });

  it('should render children', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        applicationId: 'test',
        show: true,
        htmlId: 'testModal'
      },
      listeners: {
        hide: () => { }
      },
      slots: {
        default: '<div class="testchild" />'
      }
    });

    expect(wrapper.findAll('.testchild').length).toEqual(1);
  });

  it('should not render Backdrop if prop pass in as false', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        applicationId: 'test',
        show: true,
        htmlId: 'testModal',
        backdrop: false
      },
      listeners: {
        hide: () => { }
      }
    });

    expect(wrapper.find('.reveal-modal-bg').exists()).toEqual(false);
  });

});

