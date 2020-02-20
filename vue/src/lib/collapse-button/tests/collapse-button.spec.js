import { mount, shallowMount } from '@vue/test-utils';
import CollapseButton from '../index.vue';
import Button from '../../button/index.vue';
import Icon from '../../icon/index.vue';
import Vue from 'vue';

Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);

describe('CollapseButton', () => {
  it('should match snapshot', () => {
    const container = mount(CollapseButton);
    expect(container.html()).toMatchSnapshot();
  });

  it('should call onClick callback when the button is clicked', () => {
    const onClick = jest.fn();
    const container = mount(CollapseButton, {
      listeners: {
        click: onClick
      }
    });
    container.trigger('click');

    expect(onClick).toHaveBeenCalled();
  });

  it('when collapse is true it should display right icon and label', () => {
    const container = mount(CollapseButton, {
      propsData: {
        collapse: true
      }
    });
    expect(container.find(Icon).props().name).toEqual('panel-control-right_12');
    expect(container.find(Button).props().ariaLabel).toEqual('expand');
  });

  it('when collapse is false it should display right icon and label', () => {
    const container = mount(CollapseButton, {
      propsData: {
        collapse: false
      }
    });
    expect(container.find(Icon).props().name).toEqual('panel-control-left_12');
    expect(container.find(Button).props().ariaLabel).toEqual('collapse');
  });

  describe('should apply correct alignment classes', () => {

    it('when alignment is left', () => {
      const container = shallowMount(CollapseButton, {
        propsData: {
          alignment: 'left'
        }
      });
      expect(container.find('.md-collapse-button').classes('md-collapse-button--left')).toEqual(true);
    });

    it('when alignment is right', () => {
      const container = shallowMount(CollapseButton, {
        propsData: {
          alignment: 'right'
        }
      });
      expect(container.find('.md-collapse-button').classes('md-collapse-button--right')).toEqual(true);
    });

    it('when alignment is top', () => {
      const container = shallowMount(CollapseButton, {
        propsData: {
          alignment: 'top'
        }
      });
      expect(container.find('.md-collapse-button').classes('md-collapse-button--top')).toEqual(true);
    });

    it('when alignment is down', () => {
      const container = shallowMount(CollapseButton, {
        propsData: {
          alignment: 'bottom'
        }
      });
      expect(container.find('.md-collapse-button').classes('md-collapse-button--bottom')).toEqual(true);
    });
  });
});

