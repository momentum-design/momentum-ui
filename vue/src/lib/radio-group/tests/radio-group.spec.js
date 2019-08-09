import { mount } from '@vue/test-utils';
import RadioGroup from '../index.vue';
import Radio from '../../radio/index.vue';
import Label from '../../label/index.vue';
import Vue from 'vue';

Vue.component(Radio.name, Radio);
Vue.component(Label.name, Label);

describe('RadioGroup', () => {
  it('should match snapshot', () => {
    const wrapper = mount(RadioGroup, {
      slots: {
        default: `<md-radio htmlId="test" label="test" />`
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should handle default true Values', () => {
    const wrapper = mount(RadioGroup, {
      propsData: {
        value: 'me'
      },
      slots: {
        default: `<md-radio htmlId="testRadio1" label="me" value="me" />
<md-radio htmlId="testRadio2" label="you" value="you" />
<md-radio htmlId="testRadio3" label="us" value="us" />
`
      }
    });

    expect(wrapper.findAll(Radio).at(0).props().checked).toEqual(true);
    expect(wrapper.findAll(Radio).at(1).props().checked).toEqual(false);
  });

  it('should handle Change Events', () => {
    const wrapper = mount(RadioGroup, {
      slots: {
        default: `<md-radio htmlId="testRadio1" label="me" value="me" />
<md-radio htmlId="testRadio2" label="you" value="you" />
<md-radio htmlId="testRadio3" label="us" value="us" />
`
      }
    });

    wrapper
      .find('#testRadio1')
      .trigger('change');

    expect(wrapper.findAll(Radio).at(0).props().checked).toEqual(true);
    expect(wrapper.findAll(Radio).at(1).props().checked).toEqual(false);
  });
});

