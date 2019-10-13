import { mount } from '@vue/test-utils';
import SelectOption from '../index.vue';
import Checkbox from '../../checkbox/index.vue';
import Icon from '../../icon/index.vue';
import ListItem from '../../list-item/index.vue';
import ListItemSection from '../../list-item-section/index.vue';
import Label from '../../label/index.vue';
import Vue from 'vue';

Vue.component(Checkbox.name, Checkbox);
Vue.component(Icon.name, Icon);
Vue.component(ListItem.name, ListItem);
Vue.component(ListItemSection.name, ListItemSection);
Vue.component(Label.name, Label);

describe('SelectOption', () => {
  it('should match snapshot', () => {
    const container = mount(SelectOption);
    expect(container.html()).toMatchSnapshot();
  });

  it('should render one SelectOption', () => {
    const container = mount(SelectOption);

    expect(container.find(SelectOption).exists()).toEqual(true);
    expect(container.findAll(ListItemSection).length).toEqual(2);
    expect(container.find(ListItem).exists()).toEqual(true);
  });

  it('should handle class attr', () => {
    const container = mount(SelectOption, {
      attrs: {
        class: 'menuItem'
      }
    });

    expect(container.classes('menuItem')).toEqual(true);
  });

  it('should handle label prop', () => {
    const container = mount(SelectOption, {
      propsData: {
        label: 'header'
      }
    });

    expect(container.find(ListItemSection).text()).toEqual('header');
  });

  it('should handle isMulti inject/provide paires', () => {
    const container = mount(SelectOption, {
      provide: {
        isMulti: true
      }
    });

    expect(container.findAll(ListItemSection).length).toEqual(0);
  });

  it('should handle active prop without isMulti', () => {
    const container = mount(SelectOption, {
      propsData: {
        active: true
      }
    });

    expect(container.find(Icon).exists()).toEqual(true);
  });


  it('should handle active prop with isMulti in inject', () => {
    const container = mount(SelectOption, {
      propsData: {
        active: true
      },
      provide: {
        isMulti: true
      }
    });

    expect(container.find(Checkbox).props().checked).toEqual(true);
  });

  it('should pass props to ListItem', () => {
    const container = mount(SelectOption, {
      slots: {
        customAnchor: `<div class='custom-class' />`
      }
    });

    expect(container.findAll('.custom-class').length).toEqual(1);
  });

  it('should render children', () => {
    const container = mount(SelectOption, {
      slots: {
        default: `<span class='testChildren'>Test</span>`
      }
    });

    expect(container.find('span').classes('testChildren')).toEqual(true);
  });

  describe('tests for title Prop', () => {
    it('should not have title by default', () => {
      const container = mount(SelectOption);

      expect(container.find('.md-list-item').attributes().title).toEqual(undefined);
    });

    it('should handle title prop', () => {
      const container = mount(SelectOption, {
        propsData: {
          title: 'testTitle'
        }
      });

      expect(container.find('.md-list-item').attributes().title).toEqual('testTitle');
    });

    it('should handle title if label present', () => {
      const container = mount(SelectOption, {
        propsData: {
          label: 'testTitle'
        }
      });

      expect(container.find('.md-list-item').attributes().title).toEqual('testTitle');
    });
  });
});

