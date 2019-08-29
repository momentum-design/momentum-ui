import { mount } from '@vue/test-utils';
import CheckboxGroup from '../index.vue';
import Checkbox from '../../checkbox/index.vue';
import Label from '../../label/index.vue';
import Vue from 'vue';

Vue.component(Checkbox.name, Checkbox);
Vue.component(Label.name, Label);

describe('CheckboxGroup', () => {
  it('should match snapshot', () => {
    const wrapper = mount(CheckboxGroup, {
      slots: {
        default: `<md-checkbox htmlId="test" label="test" />`
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should handle default true Values', () => {
    const wrapper = mount(CheckboxGroup, {
      propsData: {
        values: ['me']
      },
      slots: {
        default: `<md-checkbox htmlId="testCheckbox1" label="me" value="me" />
<md-checkbox htmlId="testCheckbox2" label="you" value="you" />
<md-checkbox htmlId="testCheckbox3" label="us" value="us" />
`
      }
    });

    expect(wrapper.findAll(Checkbox).at(0).props().checked).toEqual(true);
    expect(wrapper.findAll(Checkbox).at(1).props().checked).toEqual(false);
  });

  it('should handle Change Events', () => {
    const wrapper = mount(CheckboxGroup, {
      slots: {
        default: `<md-checkbox htmlId="testCheckbox1" label="me" value="me" />
<md-checkbox htmlId="testCheckbox2" label="you" value="you" />
<md-checkbox htmlId="testCheckbox3" label="us" value="us" />
`
      }
    });

    wrapper
      .find('#testCheckbox1')
      .trigger('change');

    expect(wrapper.findAll(Checkbox).at(0).props().checked).toEqual(true);
    expect(wrapper.findAll(Checkbox).at(1).props().checked).toEqual(false);
  });
});

