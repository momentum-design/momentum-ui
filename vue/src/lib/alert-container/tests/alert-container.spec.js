import { mount } from '@vue/test-utils';
import AlertContainer from '../index.vue';
import Alert from '../../alert/index.vue';
import Button from '../../button/index.vue';
import Icon from '../../icon/index.vue';
import Vue from 'vue';

Vue.component(Alert.name, Alert);
Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);

describe('AlertContainer', () => {
  it('should match snapshot', () => {
    const wrapper = mount(AlertContainer);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should pass class prop', () => {
    const wrapper = mount(AlertContainer, {
      attrs: {
        class: 'testing'
      }
    });

    expect(wrapper.find('.testing').exists()).toEqual(true);
    expect(wrapper.classes('testing')).toEqual(true);
  });

  it('should render a div in bottom-right by default', () => {
    const wrapper = mount(AlertContainer, {});

    expect(wrapper.findAll('.md-alert__container--bottom-right').length).toEqual(1);
  });

  it('should honor position prop when top-left is passed in', () => {
    const wrapper = mount(AlertContainer, {
      propsData: {
        position: 'top-left',
      }
    });

    expect(wrapper.findAll('.md-alert__container--top-left').length).toEqual(1);
  });

  it('should honor position prop when top-center is passed in', () => {
    const wrapper = mount(AlertContainer, {
      propsData: {
        position: 'top-center',
      }
    });

    expect(wrapper.findAll('.md-alert__container--top-center').length).toEqual(1);
  });

  it('should honor position prop when top-right is passed in', () => {
    const wrapper = mount(AlertContainer, {
      propsData: {
        position: 'top-right',
      }
    });

    expect(wrapper.findAll('.md-alert__container--top-right').length).toEqual(1);
  });

  it('should honor position prop when bottom-left is passed in', () => {
    const wrapper = mount(AlertContainer, {
      propsData: {
        position: 'bottom-left',
      }
    });

    expect(wrapper.findAll('.md-alert__container--bottom-left').length).toEqual(1);
  });

  it('should honor position prop when bottom-center is passed in', () => {
    const wrapper = mount(AlertContainer, {
      propsData: {
        position: 'bottom-center',
      }
    });

    expect(wrapper.findAll('.md-alert__container--bottom-center').length).toEqual(1);
  });

  it('should honor position prop when bottom-right is passed in', () => {
    const wrapper = mount(AlertContainer, {
      propsData: {
        position: 'bottom-right',
      }
    });

    expect(wrapper.findAll('.md-alert__container--bottom-right').length).toEqual(1);
  });

  it('should render an info Alert when info() is called', () => {
    const wrapper = mount(AlertContainer, {
      slots: {
        default: `<md-alert
          title="Now Hear This!"
          message="Unit tesing like a boss!"
          type='info'
          show
          :closable="false"
          />`,
      },
    });

    expect(wrapper.findAll('.md-alert--info').length).toEqual(1);
  });

  it('should render a success Alert when success() is called', () => {
    const wrapper = mount(AlertContainer, {
      slots: {
        default: `<md-alert
          title="Now Hear This!"
          message="Unit tesing like a boss!"
          type='success'
          show
          :closable="false"
          />`,
      },
    });

    expect(wrapper.findAll('.md-alert--success').length).toEqual(1);
  });

  it('should render a warning Alert when warning() is called', () => {
    const wrapper = mount(AlertContainer, {
      slots: {
        default: `<md-alert
          title="Now Hear This!"
          message="Unit tesing like a boss!"
          type='warning'
          show
          :closable="false"
          />`,
      },
    });

    expect(wrapper.findAll('.md-alert--warning').length).toEqual(1);
  });

  it('should render an error Alert when error() is called', () => {
    const wrapper = mount(AlertContainer, {
      slots: {
        default: `<md-alert
          title="Now Hear This!"
          message="Unit tesing like a boss!"
          type='error'
          show
          :closable="false"
          />`,
      },
    });

    expect(wrapper.findAll('.md-alert--error').length).toEqual(1);
  });

  it('should pass any other HTML props to Alert', () => {
    const wrapper = mount(AlertContainer, {
      slots: {
        default: `<md-alert
          title="Now Hear This!"
          message="Unit tesing like a boss!"
          type='info'
          show
          :dismissBtnProps="{ ariaLabel: 'Close', id: 'testProp' }"
          :dismissBtnEvents="{ click: ()=>{} }"
          />`,
      },
    });

    expect(wrapper.find('button').attributes().id).toEqual('testProp');
  });

  it('should pass otherProps to wrapper', () => {
    const wrapper = mount(AlertContainer, {
      attrs: {
        id: 'testid'
      }
    });

    expect(wrapper.attributes('id')).toEqual('testid');
  });

});

