import { mount } from '@vue/test-utils';
import Input from '../index.vue';
import Button from '../../button/index.vue';
import Icon from '../../icon/index.vue';
import InputError from '../../input-error/index.vue';
import InputHelper from '../../input-helper/index.vue';
import Label from '../../label/index.vue';
import Vue from 'vue';

Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);
Vue.component(InputError.name, InputError);
Vue.component(InputHelper.name, InputHelper);
Vue.component(Label.name, Label);

describe('Input', () => {
  it('should match snapshot', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        type: 'text',
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
        text: 'text',
        clear: true
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
    expect(wrapper.findAll('label').length).toEqual(1);
  });

  it('should render one Input and apply dirty class', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
        value: 'test'
      }
    });

    expect(wrapper.contains('.dirty')).toBe(true)
  });

  it('should render Label', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: '1',
        name: 'test',
        label: 'test',
      }
    });

    expect(
      wrapper.find('label').html()
    ).toEqual('<label for="1" class="md-label"><span>test</span></label>');
  });

  it('should pass class based on inputSize prop', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        inputSize: 'medium-12'
      }
    });

    expect(wrapper.classes('medium-12')).toBeTruthy();
    expect(wrapper.classes('columns')).toBeTruthy();
  });

  it('should pass placeholder attribute', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        placeholder: 'test'
      }
    });

    expect(wrapper.find('input').attributes().placeholder).toEqual('test');
  });

  it('should pass disabled attribute', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        disabled: true
      }
    });

    expect(wrapper.find('input').attributes().disabled).toEqual('disabled');
  });

  it('should pass readonly attribute', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        readonly: true
      }
    });

    expect(wrapper.find('input').attributes().readonly).toEqual('readonly');
  });

  it('should pass value attribute', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        value: 'testing'
      }
    });

    expect(wrapper.find('input').attributes().value).toEqual('testing');
  });

  it('should pass class based on nesting', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        nestedLevel: 1
      }
    });

    expect(wrapper.classes('md-input--nested-1')).toBeTruthy();
  });

  it('should render Secondary Container and Label', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        secondaryLabel: 'test'
      }
    });

    expect(wrapper.contains('.md-label__secondary-label-container')).toBeTruthy();
    expect(wrapper.contains('.md-label__secondary-label')).toBeTruthy();
  });

  it('should render Helper Text', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        inputHelpText: 'test'
      }
    });

    expect(wrapper.contains(InputHelper)).toBeTruthy();
  });

  it('should determine correct error class(warning)', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        errorArr: [{ error: 'test', type: 'warning' }]
      }
    });

    expect(wrapper.find('.md-input-group').classes('warning')).toBeTruthy();
  });

  it('should determine correct error class(error)', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        errorArr: [{ error: 'test', type: 'error' }]
      }
    });

    expect(wrapper.find('.md-input-group').classes('error')).toBeTruthy();
  });

  it('should determine correct error class if passed error and warning(error)', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        errorArr: [
          { error: 'error1', type: 'error' },
          { error: 'error2', type: 'warning' },
        ]
      }
    });

    expect(wrapper.find('.md-input-group').classes('error')).toBeTruthy();
  });

  it('should render Error Component', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        errorArr: [{ error: 'test', type: 'error' }]
      }
    });

    expect(wrapper.contains(InputError)).toBeTruthy();
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
        htmlId: 'test123',
        name: 'test',
        label: 'test',
      },
      slots: {
        default: '<div class="testingforhoc" />',
      }
    });

    expect(wrapper.findAll('.testingforhoc').length).toEqual(1);
  });

  it('should handle change event', () => {
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

    wrapper.vm.$emit('change', { target: { value: 'test' } });
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

    wrapper.vm.$emit('mousedown');
    expect(count).toEqual(1);
  });

  it('should handle focus event', () => {
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

    wrapper.vm.$emit('focus');
    expect(count).toEqual(1);
  });

  it('should not render clear icon', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
      }
    });

    wrapper.vm.$emit('change', { target: { value: 'test' } });
    expect(wrapper.find('.md-button--icon').exists()).toBeFalsy();
  });

  it('should render clear icon if prop is present', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
        name: 'test',
        label: 'test',
        value: 'test',
        clear: true
      }
    });

    expect(wrapper.find('.md-button--icon').exists()).toBeTruthy();
  });

  it('should clear value if clear icon is clicked', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test123',
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
        htmlId: 'test',
        label: 'test',
        value: 'test',
      }
    });

    expect(wrapper.find('.md-input__icon').exists()).toBeFalsy();
  });

  it('should render custom icon if prop is present', () => {
    const wrapper = mount(Input, {
      propsData: {
        htmlId: 'test',
        label: 'test',
        value: 'test',
        clearIconName: 'icon-info_16'
      }
    });

    expect(wrapper.find('.md-icon').exists()).toBeTruthy();
  });

});

