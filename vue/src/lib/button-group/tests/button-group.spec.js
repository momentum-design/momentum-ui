import { mount, shallowMount } from '@vue/test-utils';
import ButtonGroup from '../index.vue';
import Button from '../../button/index.vue';
import Icon from '../../icon/index.vue';
import Vue from 'vue';

Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);

describe('ButtonGroup', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(ButtonGroup, {
      slots: {
        default: `<md-button :ariaLabel="'test'">1</md-button>`
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('ButtonGroup should have justified as true', () => {
    const wrapper = shallowMount(ButtonGroup, {
      slots: {
        default: `<md-button :ariaLabel="'test'">1</md-button>
<md-button :ariaLabel="'test'">2</md-button>`
    }
    });

    expect(wrapper.classes('md-button-group--justified')).toBe(true);
  });

  it('ButtonGroup theme is set to dark', () => {
    const wrapper = shallowMount(ButtonGroup, {
      slots: {
        default: `<md-button :ariaLabel="'test'">1</md-button>
<md-button :ariaLabel="'test'">2</md-button>`
      },
      propsData: {
        theme: 'dark'
      }
    });

    expect(wrapper.classes('md-button-group--dark')).toBe(true);
  });

  it('ButtonGroup type is set to pill', () => {
    const wrapper = shallowMount(ButtonGroup, {
      slots: {
        default: `<md-button :ariaLabel="'test'">1</md-button>
<md-button :ariaLabel="'test'">2</md-button>`
      },
      propsData: {
        type: 'pill'
      }
    });

    expect(wrapper.classes('md-button-group--pill')).toBe(true);
  });

  it('should not highlight the active button when highlightSelected is false', () => {
    const wrapper = shallowMount(ButtonGroup, {
      slots: {
        default: `<md-button :ariaLabel="'test'">1</md-button>
<md-button :ariaLabel="'test'">2</md-button>`
      },
      propsData: {
        highlightSelected: false
      }
    });

    wrapper.find('button').trigger('click');
    expect(wrapper.find('button').classes('active')).toBe(false);
  });

  it('should apply an modifier to button when Button contains Icon as a children', () => {
    const wrapper = mount(ButtonGroup, {
      slots: {
        default: `<md-button :ariaLabel="'test'"><md-icon :name="'icon-arrow-left_12'" /></md-button>`
      }
    });

    expect(wrapper.find('button').classes('md-button--icon-group')).toBe(true);
  });

  it('onClick should should mark the button as active', () => {
    const wrapper = mount(ButtonGroup, {
      slots: {
        default: `<md-button :ariaLabel="'test'">1</md-button>
<md-button :ariaLabel="'test'">2</md-button>`
    }
    });
    wrapper.find('button').trigger('click');
    expect(wrapper.find('button').attributes().tabindex).toEqual("0");
    expect(wrapper.find('button').classes('active')).toBe(true);
  });

  it('if focusOnLoad is set to true, then should set the focus on the first button', () => {
    shallowMount(ButtonGroup, {
      slots: {
        default: `<md-button :ariaLabel="'test'" id="one">1</md-button>
<md-button :ariaLabel="'test'" id="two">2</md-button>`
      },
      propsData: {
        focusOnLoad: true
      }
    });
    expect(document.activeElement.id).toEqual('one');
  });

  it('when initialActiveIndex prop is passed, the button should be selected', () => {
    const wrapper = shallowMount(ButtonGroup, {
      slots: {
        default: `<md-button :ariaLabel="'test'" id="one">1</md-button>
<md-button :ariaLabel="'test'" id="two">2</md-button>`
      },
      propsData: {
        initialActiveIndex: 1
      }
    });
    expect(wrapper.findAll('button').at(1).classes('active')).toEqual(true);
  });

  it('should handle keyBoard keys', () => {
    const wrapper = shallowMount(ButtonGroup, {
      slots: {
        default: `<md-button :ariaLabel="'test'">one</md-button>
<md-button :ariaLabel="'test'">two</md-button>`
    }
    });
    expect(wrapper.findAll('button').at(0).attributes().tabindex).toEqual('0');
    // right
    wrapper.findAll('button').at(0).trigger('keydown.right');
    expect(wrapper.findAll('button').at(1).attributes().tabindex).toEqual('0');
    // left
    wrapper.findAll('button').at(1).trigger('keydown.left');
    expect(wrapper.findAll('button').at(0).attributes().tabindex).toEqual('0');
    // up key
    wrapper.findAll('button').at(0).trigger('keydown.up');
    expect(wrapper.findAll('button').at(1).attributes().tabindex).toEqual('0');

    // enter key
    wrapper.findAll('button').at(1).trigger('keydown.enter');
    expect(wrapper.findAll('button').at(1).classes('active')).toEqual(true);

    // enter char
    expect(wrapper.findAll('button').at(1).attributes().tabindex).toEqual('0');
    wrapper.findAll('button').at(1).trigger('keydown', { key: 'o' });
    expect(wrapper.findAll('button').at(0).attributes().tabindex).toEqual('0');
  });

  it('should not throw error if child is not a Button', () => {
    const wrapper = shallowMount(ButtonGroup, {
      slots: {
        default: '<div>xx</div>' }
    });

    expect(wrapper.classes('md-button-group')).toBe(true);
  });

});

