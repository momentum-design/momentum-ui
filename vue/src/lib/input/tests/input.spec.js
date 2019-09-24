import { mount } from '@vue/test-utils';
import Input from '../index.vue';
import Button from '../../button/index.vue';
import Icon from '../../icon/index.vue';
import InputHelper from '../../input-helper/index.vue';
import InputMessage from '../../input-message/index.vue';
import InputSection from '../../input-section/index.vue';
import Label from '../../label/index.vue';
import Vue from 'vue';

Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);
Vue.component(InputHelper.name, InputHelper);
Vue.component(InputMessage.name, InputMessage);
Vue.component(InputSection.name, InputSection);
Vue.component(Label.name, Label);

describe('Input', () => {
  it('should match snapshot', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        type: 'text'
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should change tag based on multiline prop', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        multiline: true,
      }
    });

    expect(wrapper.findAll('textarea').length).toEqual(1);
  });

  it('should match number SnapShot', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        type: 'number',
      }
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match password SnapShot', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        type: 'password',
      }
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match aria SnapShot', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        ariaDescribedBy: 'ariaDescribedBy',
      }
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match clear SnapShot', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        type: 'text',
        clear: true,
      }
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should render one Input', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
      }
    });

    expect(wrapper.findAll('input').length).toEqual(1);
  });

  it('should render one Input and apply dirty class', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        value: 'test',
      }
    });

    expect(wrapper.findAll('.md-dirty').length).toEqual(1);
  });

  it('should render Label', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
      }
    });

    expect(wrapper.find('.md-input__label').exists()).toEqual(true);
  });

  it('should pass class based on containerSize prop', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        containerSize: 'medium-12'
      }
    });

    expect(wrapper.find('.md-input-container').classes('medium-12')).toEqual(true);
    expect(wrapper.find('.md-input-container').classes('columns')).toEqual(true);
  });

  it('should pass class based on inputSize prop', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        inputSize: 'medium-12'
      }
    });

    expect(wrapper.find('.md-input__wrapper').classes('medium-12')).toEqual(true);
    expect(wrapper.find('.md-input__wrapper').classes('columns')).toEqual(true);
  });

  it('should pass placeholder attribute', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        placeholder: 'test'
      }
    });

    expect(wrapper.find('input').attributes().placeholder).toEqual('test');
  });

  it('should pass class', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
      },
      attrs: {
        class: 'test'
      }
    });

    expect(wrapper.classes('test')).toEqual(true);
  });

  it('should pass inputClassName prop', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        inputClassName: 'test',
      }
    });

    expect(wrapper.find('input').classes('test')).toEqual(true);
  });

  it('should pass isFilled prop', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        isFilled: true,
      }
    });

    expect(wrapper.find('.md-input-container').classes('md-input--filled')).toEqual(true);
  });

  it('should pass shape prop', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        shape: 'pill',
      }
    });

    expect(wrapper.find('input').classes('md-input--pill')).toEqual(true);
  });

  it('should pass disabled attribute', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        disabled: true,
      }
    });

    expect(wrapper.find('input').attributes().disabled).toEqual('disabled');
  });

  it('should pass readonly attribute', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        readonly: true,
      }
    });

    expect(wrapper.find('input').attributes().readonly).toEqual('readonly');
  });

  it('should pass value attribute', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        value: 'testing',
      }
    });

    expect(wrapper.find('input').attributes().value).toEqual('testing');
  });

  it('should update value attribute', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        value: '',
      }
    });

    wrapper.setProps({ value: 'testing' });
    expect(wrapper.find('input').attributes().value).toEqual('testing');
  });

  it('should pass class based on nesting', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        nestedLevel: 1,
      }
    });

    expect(wrapper.classes('md-input--nested-1')).toEqual(true);
  });

  it('should render Secondary Container and Label', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        secondaryLabel: 'test',
      }
    });

    expect(wrapper.contains('.md-input__secondary-label')).toEqual(true);
  });

  it('should render Helper Text', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        helpText: 'test',
      }
    });

    expect(wrapper.contains(InputHelper)).toEqual(true);
  });

  it('should not render messages if incorrectly passed in', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        messageArr: [{ m: 'test', t: 'success' }],
      }
    });

    expect(wrapper.find('.md-input-container').classes('md-success')).toEqual(false);
  });

  it('should determine correct message class(success)', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        messageArr: [{ message: 'test', type: 'success' }],
      }
    });

    expect(wrapper.find('.md-input-container').classes('md-success')).toEqual(true);
  });

  it('should determine correct error class(warning)', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        messageArr: [{ message: 'test', type: 'warning' }],
      }
    });

    expect(wrapper.find('.md-input-container').classes('md-warning')).toEqual(true);
  });

  it('should determine correct error class(error)', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        messageArr: [{ message: 'test', type: 'error' }],
      }
    });

    expect(wrapper.find('.md-input-container').classes('md-error')).toEqual(true);
  });

  it('should determine correct error class if passed error and warning(error)', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        messageArr: [
          { message: 'error1', type: 'error' },
          { message: 'error2', type: 'warning' },
        ],
      }
    });

    expect(wrapper.find('.md-input-container').classes('md-error')).toEqual(true);
  });

  it('should render Error Component', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        messageArr: [{ message: 'test', type: 'error' }],
      }
    });

    expect(wrapper.contains(InputMessage)).toEqual(true);
  });

  it('should support input ref', () => {
    const inputRef = 'input1';
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        inputRef: inputRef
      }
    });
    expect(wrapper.vm.$refs[inputRef].tagName).toEqual('INPUT');
  });

  it('should render children', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
      },
      slots: {
        default: `<div class="testingforhoc" />`
      }
    });

    expect(wrapper.findAll('.testingforhoc').length).toEqual(1);
  });

  it('should handle onChange event', () => {
    let count = 0;
    const countUp = () => count++;
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
      },
      listeners: {
        change: countUp
      }
    });

    wrapper.find('input').trigger('change');
    expect(count).toEqual(1);
  });

  it('should handle onDoneEditing event', () => {
    let count = 0;
    const countUp = () => count++;
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
      },
      listeners: {
        doneediting: countUp
      }
    });

    wrapper.find('input').trigger('change');
    wrapper.find('input').trigger('blur');
    expect(count).toEqual(1);
  });

  it('should handle mouse down event', () => {
    let count = 0;
    const countUp = () => count++;
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
      },
      listeners: {
        mousedown: countUp
      }
    });

    wrapper.find('input').trigger('mousedown');
    expect(count).toEqual(1);
  });

  it('should handle null mouse down event', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
      }
    });

    wrapper.find('input').trigger('mousedown');
    expect(wrapper.vm.isEditing).toEqual(true);
  });

  it('should not handle mouse down event when disabled', () => {
    let count = 0;
    const countUp = () => count++;
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        disabled: true,
      },
      listeners: {
        mousedown: countUp
      }
    });

    wrapper.find('input').trigger('mousedown');
    expect(count).toEqual(0);
  });

  it('should handle onFocus event', () => {
    let count = 0;
    const countUp = () => count++;
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
      },
      listeners: {
        focus: countUp
      }
    });

    wrapper.find('input').trigger('focus');
    expect(count).toEqual(1);
  });

  it('should handle null onFocus event', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
      }
    });

    wrapper.find('input').trigger('focus');
    expect(wrapper.vm.isEditing).toEqual(true);
  });

  it('should not handle onFocus event when disabled', () => {
    let count = 0;
    const countUp = () => count++;
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        disabled: true
      },
      listeners: {
        focus: countUp
      }
    });

    wrapper.find('input').trigger('focus');
    expect(count).toEqual(0);
  });

  it('should handle onKeyDown event', () => {
    const onKeyDown = jest.fn();
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
      },
      listeners: {
        keydown: onKeyDown
      }
    });

    wrapper.find('input').trigger('keydown', { key: 'a' });
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('should not render clear icon', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
      }
    });

    wrapper.find('input').trigger('change', { value: 'test' });
    expect(wrapper.find('.md-button--icon').exists()).toBeFalsy();
  });

  it('should render clear icon if prop is present', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        clear: true
      }
    });

    wrapper.setProps({ value: 'test' })
    wrapper.find('input').trigger('change');
    expect(wrapper.find('.md-button--icon').exists()).toEqual(true);
  });

  it('should clear value if clear icon is clicked', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        value: 'test',
        clear: true
      }
    });

    expect(wrapper.find('input').attributes().value).toEqual('test');

    wrapper.find('button.md-button--icon').trigger('click');
    expect(wrapper.find('input').attributes().value).toEqual('');
    expect(wrapper.find('.md-button--icon').exists()).toBeFalsy();
  });

  it('should clear value if Enter is pressed on the keyboard', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        value: 'test',
        clear: true
      }
    });

    expect(wrapper.find('input').attributes().value).toEqual('test');
    wrapper.find('button.md-button--icon').trigger('keydown.enter');
    expect(wrapper.find('input').attributes().value).toEqual('');
    expect(wrapper.find('.md-button--icon').exists()).toBeFalsy();
  });

  it('should clear value if Space is pressed on the keyboard', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        value: 'test',
        clear: true
      }
    });

    expect(wrapper.find('input').attributes().value).toEqual('test');
    wrapper.find('button.md-button--icon').trigger('keydown.space');
    expect(wrapper.find('input').attributes().value).toEqual('');
    expect(wrapper.find('.md-button--icon').exists()).toBeFalsy();
  });

  it('should focus on input when clear is triggered with htmlId', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        value: 'test',
        clear: true
      }
    });

    wrapper.find('button.md-button--icon').trigger('click');
    expect(wrapper.find('input') === document.activeElement);
  });

  it('should focus on input when clear is triggered with id', () => {
    const wrapper = mount(Input, {
      propsData: {
        id: 'test123',
        name: 'test',
        label: 'test',
        value: 'test',
        clear: true
      }
    });

    wrapper.find('button.md-button--icon').trigger('click');
    expect(wrapper.find('input') === document.activeElement);
  });

  it('should not render custom icon', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        value: 'test',
      }
    });

    expect(wrapper.find('.md-input__icon').exists()).toBeFalsy();
  });

  it('should render custom icon if inputBefore is present', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        value: 'test',
      },
      slots: {
        inputBefore: `<md-icon name="icon-info_16" ariaLabel="custom icon" />`
      }
    });

    expect(wrapper.find('.md-icon').exists()).toEqual(true);
  });

  it('should render custom icon if inputAfter is present', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        value: 'test',
      },
      slots: {
        inputAfter: `<md-icon name="icon-info_16" ariaLabel="custom icon" />`
      }
    });

    expect(wrapper.find('.md-icon').exists()).toEqual(true);
  });

});
