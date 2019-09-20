import { mount } from '@vue/test-utils';
import InputSearch from '../index.vue';
import Icon from '../../icon/index.vue';
import Input from '../../input/index.vue';
import InputSection from '../../input-section/index.vue';
import Spinner from '../../spinner/index.vue';
import Vue from 'vue';

Vue.component(Icon.name, Icon);
Vue.component(Input.name, Input);
Vue.component(InputSection.name, InputSection);
Vue.component(Spinner.name, Spinner);

describe('InputSearch', () => {
  it('should match snapshot', () => {
    const wrapper = mount(InputSearch, {
      propsData: {
        name: 'test',
        id: '1',
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match pill SnapShot', () => {
    const wrapper = mount(InputSearch, {
      propsData: {
        name: 'test',
        id: '1',
        shape: 'pill'
      }
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match loading SnapShot', () => {
    const wrapper = mount(InputSearch, {
      propsData: {
        name: 'test',
        id: '1',
        isLoading: true
      }
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should pass isLoading prop', () => {
    const wrapper = mount(InputSearch, {
      propsData: {
        name: 'test',
        id: '1',
        isLoading: true
      }
    });

    expect(wrapper.find('.md-spinner').exists()).toEqual(true);
  });

  it('should render Icon component', () => {
    const wrapper = mount(InputSearch, {
      propsData: {
        name: 'test',
        id: '1',
        shape: 'pill'
      }
    });
    expect(wrapper.findAll('.md-icon').length).toEqual(1);
  });

  it('should render one Input', () => {
    const wrapper = mount(InputSearch, {
      propsData: {
        name: 'test',
        id: '1',
      }
    });

    expect(wrapper.findAll('input').length).toEqual(1);
    expect(wrapper.isEmpty()).toEqual(false);
  });

  it('should pass disabled attribute', () => {
    const wrapper = mount(InputSearch, {
      propsData: {
        name: 'test',
        id: '1',
        disabled: true
      }
    });

    expect(wrapper.find('input').attributes().disabled).toEqual('disabled');
  });

  it('should pass readonly attribute', () => {
    const wrapper = mount(InputSearch, {
      propsData: {
        name: 'test',
        id: '1',
        readonly: true
      }
    });

    expect(wrapper.find('input').attributes().readonly).toEqual('readonly');
  });

  it('should pass value attribute', () => {
    const handleChange = jest.fn();
    const wrapper = mount(InputSearch, {
      propsData: {
        name: 'test',
        id: '1',
      },
      attrs: {
        value: 'testing'
      },
      listeners: {
        change: handleChange
      }
    });

    expect(wrapper.find('input').attributes().value).toEqual('testing');
  });
});

