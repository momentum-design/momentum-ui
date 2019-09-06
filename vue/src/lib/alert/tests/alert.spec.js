import { mount } from '@vue/test-utils';
import Alert from '../index.vue';
import Button from '../../button/index.vue';
import Icon from '../../icon/index.vue';
import Vue from 'vue';

Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);

describe('Alert', () => {
  it('should match snapshot', () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        dismissBtnProps: {
          ariaLabel: 'Close'
        }
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render one Alert', () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        closable: false,
      }
    });

    expect(wrapper.findAll('.md-alert').length).toEqual(1);
  });

  it('should pass otherProps to wrapper', () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        closable: false,
        id: 'testid',
      }
    });

    expect(wrapper.find('#testid').exists()).toEqual(true);
  });

  it('should pass class prop', () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        closable: false,
      },
      attrs: {
        class: 'testing',
      }
    });

    expect(wrapper.find('.testing').exists()).toEqual(true);
    expect(wrapper.classes('testing')).toEqual(true);
  });

  it('should render title', () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        title: 'test',
        dismissBtnProps: {
          ariaLabel: 'Close'
        }
      },
    });

    expect(wrapper.find('.md-alert__title').text()).toEqual('test');
  });

  it('should render message', () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        message: 'test',
        dismissBtnProps: {
          ariaLabel: 'Close'
        }
      },
    });

    expect(wrapper.find('.md-alert__message').text()).toEqual('test');
  });

  it('should not display closable button if set to false', () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        closable: false,
      },
    });

    expect(wrapper.find('.md-button').exists()).toEqual(false);
  });

  it('should display closable button by default', () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        dismissBtnProps: {
          ariaLabel: 'Close'
        }
      },
    });

    expect(wrapper.find('.md-button').exists()).toEqual(true);
  });

  it('should pass type attribute props (success)', () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        closable: false,
        type: 'success',
      },
    });

    expect(wrapper.find('.md-alert').classes('md-alert--success')).toEqual(true);
  });

  it('should pass type attribute props (warning)', () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        closable: false,
        type: 'warning',
      },
    });

    expect(wrapper.find('.md-alert').classes('md-alert--warning')).toEqual(true);
  });

  it('should pass type attribute props (error)', () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        closable: false,
        type: 'error',
      },
    });

    expect(wrapper.find('.md-alert').classes('md-alert--error')).toEqual(true);
  });

  it('should handle hide event', () => {
    let count = 0;
    const countUp = () => count++;
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        dismissBtnProps: {
          ariaLabel: 'Close'
        },
        dismissBtnEvents: {
          click: () => countUp()
        }
      },
    });

    wrapper.find('.md-button').trigger('click');
    expect(count).toEqual(1);
  });

  it('should pass dismissBtnProps prop', () => {
    const wrapper = mount(Alert, {
      propsData: {
        show: true,
        dismissBtnProps: {
          ariaLabel: 'Close'
        },
      },
    });

    expect(wrapper.find('button').attributes('aria-label')).toEqual('Close');
  });

});

