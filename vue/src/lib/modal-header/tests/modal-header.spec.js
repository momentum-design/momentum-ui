import { mount } from '@vue/test-utils';
import ModalHeader from '../index.vue';
import CloseIcon from '../../close-icon/index.vue';
import Vue from 'vue';

Vue.component(CloseIcon.name, CloseIcon);

describe('ModalHeader', () => {
  it('should match snapshot', () => {
    const wrapper = mount(ModalHeader);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render one ModalHeader', () => {
    const wrapper = mount(ModalHeader);
    expect(wrapper.find('div').classes('md-modal__header')).toEqual(true);
  });

  it('should display closable button by default', () => {
    const wrapper = mount(ModalHeader);

    expect(wrapper.findAll('.md-modal__close').length).toEqual(1);
  });

  it('should apply closeBtnProps', () => {
    const wrapper = mount(ModalHeader, {
      propsData: {
        closeBtnProps: { class: 'test'}
      }
    });

    expect(wrapper.findAll('.test').length).toEqual(1);
  });

  it('should display not display closable button', () => {
    const wrapper = mount(ModalHeader, {
      propsData: {
        showCloseButton: false
      }
    });

    expect(wrapper.find('Icon').exists()).toEqual(false);
  });

  it('should pass onClose function to click', () => {
    const onClose = jest.fn();

    const wrapper = mount(ModalHeader, {
      provide: {
        close: onClose,
      }
    });

    wrapper.find('button.md-modal__close').trigger('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should render headerLabel', () => {
    const wrapper = mount(ModalHeader, {
      propsData: {
        headerLabel: 'test'
      }
    });

    expect(wrapper.findAll('.md-modal__title').length).toEqual(1);
    expect(wrapper.find('.md-modal__title').text()).toEqual('test');
  });

  it('should render message', () => {
    const wrapper = mount(ModalHeader, {
      propsData: {
        message: 'test'
      }
    });

    expect(wrapper.findAll('.md-modal__message').length).toEqual(1);
    expect(wrapper.find('.md-modal__message').text()).toEqual('test');
  });

  it('should render children', () => {
    const wrapper = mount(ModalHeader, {
      slots: {
        default: '<div class="test" />'
      }
    });

    expect(wrapper.findAll('.test').length).toEqual(1);
  });

  it('should only render if children & headerLabel', () => {
    const wrapper = mount(ModalHeader, {
      propsData: {
        headerLabel: 'test'
      },
      slots: {
        default: '<div class="test" />'
      }
    });

    expect(wrapper.findAll('.md-modal__title').length).toEqual(0);
    expect(wrapper.findAll('.test').length).toEqual(1);
  });
});

