import { mount, shallowMount } from '@vue/test-utils';
import Select from '../index.vue';
import SelectOption from '../../select-option/index.vue';
import Button from '../../button/index.vue';
import Checkbox from '../../checkbox/index.vue';
import EventOverlay from '../../event-overlay/index.vue';
import Icon from '../../icon/index.vue';
import List from '../../list/index.vue';
import ListItem from '../../list-item/index.vue';
import ListItemSection from '../../list-item-section/index.vue';
import Label from '../../label/index.vue';
import Vue from 'vue';

Vue.component(SelectOption.name, SelectOption);
Vue.component(Button.name, Button);
Vue.component(Checkbox.name, Checkbox);
Vue.component(EventOverlay.name, EventOverlay);
Vue.component(Icon.name, Icon);
Vue.component(List.name, List);
Vue.component(ListItem.name, ListItem);
Vue.component(ListItemSection.name, ListItemSection);
Vue.component(Label.name, Label);

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

describe('Select', () => {
  it('should match snapshot', () => {
    const container = mount(Select);
    expect(container.html()).toMatchSnapshot();
  });

  it('should render children', () => {
    const container = shallowMount(Select, {
      slots: {
        default: `<div class='child' />`
      }
    });
    container.vm.isOpen = true;
    expect(container.findAll('.child').length).toEqual(1);
  });

  it('should handle class attrs', () => {
    const container = mount(Select, {
      attrs: {
        class: 'testInput'
      }
    });

    expect(container.classes('testInput')).toEqual(true);
  });

  it('should handle buttonProps prop', () => {
    const container = mount(Select, {
      propsData: {
        buttonProps: {
          className: 'testInput'
        }
      }
    });

    expect(container.find('button').classes('testInput')).toEqual(true);
  });

  it('should handle listProps prop', () => {
    const container = mount(Select, {
      propsData: {
        listProps: {
          class: 'testInput'
        }
      }
    });

    container.find('button').trigger('click');
    expect(container.find(List).classes('testInput')).toEqual(true);
  });

  it('should handle overlayProps prop', () => {
    const container = mount(Select, {
      propsData: {
        overlayProps: {
          class: 'testInput'
        }
      }
    });

    container.find('button').trigger('click');
    expect(container.find(EventOverlay).classes('testInput')).toEqual(true);
  });

  it('should handle isDynamic prop', () => {
    const container = mount(Select, {
      attrs: {
        class: 'testInput'
      },
      propsData: {
        isDynamic: false,
      }
    });

    container.find('button').trigger('click');
    container.vm.isOpen = true;
    expect(container.find(EventOverlay).props().isDynamic).toEqual(false);
  });

  it('should close on select (non-multi)', () => {
    const container = mount(Select, {
      slots: {
        default: `<md-select-option value='1' label='test1' />
        <md-select-option value='2' class='clickMe' label='test2'/>
        <md-select-option value='3' label='test3'/>`
      }
    });

    container.find('button').trigger('click');
    expect(container.vm.isOpen).toEqual(true);
    container.find('.clickMe').trigger('click');
    expect(container.vm.selected).toEqual([{label:'test2', value:'2'}]);
    expect(container.vm.isOpen).toEqual(false);
  });

  it('should allow on multi-select', () => {
    const container = mount(Select, {
      propsData: {
        isMulti: true
      },
      slots: {
        default: `<md-select-option value='1' class='clickMe1' />
        <md-select-option value='2' class='clickMe2' />
        <md-select-option value='3' />`
      }
    });

    expect(container.vm.isOpen).toEqual(false);
    container.find('button').trigger('click');
    expect(container.vm.isOpen).toEqual(true);
    container.findAll(SelectOption).at(0).trigger('click');
    expect(container.vm.selected).toEqual([{label:'',value:'1'}]);
    expect(container.vm.isOpen).toEqual(true);
    container.findAll(SelectOption).at(1).trigger('click');
    expect(container.vm.selected).toEqual([{'label':'', value:'1'},{'label':'', value:'2'}]);
    expect(container.vm.isOpen).toEqual(true);
  });

  it('should unselect after selecting on multi-select', () => {
    const container = mount(Select, {
      propsData: {
        isMulti: true
      },
      slots: {
        default: `<md-select-option value='1' class='clickMe1' />
        <md-select-option value='2' class='clickMe2' />
        <md-select-option value='3' />`
      }
    });

    expect(container.vm.isOpen).toEqual(false);
    container.find('button').trigger('click');
    expect(container.vm.isOpen).toEqual(true);
    container.findAll(SelectOption).at(0).trigger('click');
    expect(container.vm.selected).toEqual([{label:'', value: '1'}]);
    expect(container.vm.isOpen).toEqual(true);
    container.findAll(SelectOption).at(0).trigger('click');
    expect(container.vm.selected).toEqual([]);
    expect(container.vm.isOpen).toEqual(true);
  });

  it('should pass defaultValue attribute', () => {
    const container = mount(Select, {
      propsData: {
        defaultValue: 'test',
      }
    });

    expect(container.find('.md-select__label').text()).toEqual('test');
  });

  it('should continue updating input value on select', () => {
    const container = mount(Select, {
      propsData: {
        isMulti: true
      },
      slots: {
        default: `<md-select-option value='1' class='clickMe1' />
        <md-select-option value='2' class='clickMe2' />
        <md-select-option value='3' />`
      }
    });

    expect(container.vm.isOpen).toEqual(false);
    container.find('button').trigger('click');
    expect(container.vm.isOpen).toEqual(true);
    container.find(SelectOption).trigger('click');
    expect(container.find('.md-select__label').text()).toEqual('1 Item Selected');
    container.findAll(SelectOption).at(1).trigger('click');
    expect(container.find('.md-select__label').text()).toEqual('2 Items Selected');
  });

  it('should handle onSelect event', () => {
    const onSelect = jest.fn();

    const container = mount(Select, {
      listeners: {
        select: onSelect
      },
      slots: {
        default: `<md-select-option value='1' class='clickMe1' />
        <md-select-option value='2' class='clickMe2' />
        <md-select-option value='3' />`
      }
    });

    expect(container.vm.isOpen).toEqual(false);
    container.find('button').trigger('click');
    expect(container.vm.isOpen).toEqual(true);
    container.find('.clickMe1').trigger('click');
    expect(onSelect).toHaveBeenCalled();
  });
});

