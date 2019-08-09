import { mount } from '@vue/test-utils';
import List from '../index.vue';
import ListItem from '../../list-item/index.vue';
import Vue from 'vue';

Vue.component(ListItem.name, ListItem);

describe('List', () => {
  beforeEach(() => {
    document.activeElement.blur();
  });

  it('should match snapshot', () => {
    const wrapper = mount(List);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should handle class prop', () => {
    const wrapper = mount(List, {
      propsData: {
        class: 'menuItem'
      }
    });

    expect(wrapper.classes('menuItem')).toEqual(true);
  });

  it('should handle role prop', () => {
    const wrapper = mount(List, {
      propsData: {
        role: 'menuitem'
      }
    });

    expect(wrapper.attributes().role).toEqual('menuitem');
  });

  it('should handle tabType prop', () => {
    const wrapper = mount(List, {
      propsData: {
        tabType: 'horizontal'
      },
      slots: {
        default: '<md-list-item />'
      }
    });

    expect(wrapper.classes('md-list--horizontal')).toEqual(true);
  });

  it('should handle wrap prop', () => {
    const wrapper = mount(List, {
      propsData: {
        tabType: 'horizontal',
        wrap: true
      },
      slots: {
        default: '<md-list-item />'
      }
    });

    expect(wrapper.classes('md-list--wrap')).toEqual(true);
  });

  it('should handle itemRole prop', () => {
    const wrapper = mount(List, {
      propsData: {
        itemRole: 'newRole',
      },
      slots: {
        default: '<md-list-item />'
      }
    });

    expect(wrapper.findAll('[role="newRole"]').length).toEqual(1);
  });

  it('should handle type prop', () => {
    const wrapper = mount(List, {
      propsData: {
        type: 'small',
      },
      slots: {
        default: '<md-list-item />'
      }
    });

    expect(wrapper.findAll('.md-list-item--small').length).toEqual(1);
  });

  it('should render children', () => {
    const wrapper = mount(List, {
      propsData: {
        class: 'testingforTC',
      },
      slots: {
        default: '<md-list-item />'
      }
    });

    expect(wrapper.classes('testingforTC')).toEqual(true);
  });

  it('should handle select event', () => {
    const onSelect = jest.fn();

    const wrapper = mount(List, {
      listeners: {
        select: onSelect,
      },
      slots: {
        default: `<md-list-item label="test" link='javscript:void(0)' />
        <md-list-item class="secondIndex" link='javscript:void(0)' />`
      }
    });

    wrapper.findAll('.secondIndex').at(0).trigger('click');
    expect(onSelect).toHaveBeenCalled();
  });

  it('should handle keyPress event (Up/Down/Left/Right)', () => {
    const wrapper = mount(List, {
      slots: {
        default: `<md-list-item class='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <md-list-item class='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <md-list-item class='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />`
      }
    });

    const anchor1 = wrapper.find('.firstIndex');

    expect(wrapper.vm.focusEventKey).toEqual('test-list-1');
    anchor1.trigger('keydown', {key: 'ArrowDown'});
    expect(wrapper.vm.focusEventKey).toEqual('test-list-2');
    anchor1.trigger('keydown', {key: 'ArrowRight'});
    expect(wrapper.vm.focusEventKey).toEqual('test-list-2');

    anchor1.trigger('keydown', {key: 'ArrowUp'});
    expect(wrapper.vm.focusEventKey).toEqual('test-list-3');
    anchor1.trigger('keydown', {key: 'ArrowLeft'});
    expect(wrapper.vm.focusEventKey).toEqual('test-list-3');
  });

  it('should handle keyPress event (PageUp/PageDown/Home/End)', () => {
    const wrapper = mount(List, {
      slots: {
        default: `<md-list-item class='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <md-list-item class='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <md-list-item class='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />`
      }
    });

    const anchor1 = wrapper.find('.firstIndex');
    const anchor3 = wrapper.find('.thirdIndex');

    expect(wrapper.vm.focusEventKey).toEqual('test-list-1');
    anchor1.trigger('keydown', {key: 'PageDown'});
    expect(wrapper.vm.focusEventKey).toEqual('test-list-3');
    anchor1.trigger('keydown', {key: 'End'});
    expect(wrapper.vm.focusEventKey).toEqual('test-list-3');

    anchor3.trigger('keydown', {key: 'PageUp'});
    expect(wrapper.vm.focusEventKey).toEqual('test-list-1');
    anchor3.trigger('keydown', {key: 'Home'});
    expect(wrapper.vm.focusEventKey).toEqual('test-list-1');
  });

  it('should handle keyPress event (o)', () => {
    const wrapper = mount(List, {
      slots: {
        default: `<md-list-item class='firstIndex' label="arrest" link='javscript:void(0)' id='test-list-1' />
        <md-list-item class='secondIndex' label="detest" link='javscript:void(0)' id='test-list-2'/>
        <md-list-item class='thirdIndex' label="obsessed" link='javscript:void(0)' id='test-list-3' />`
      }
    });

    const anchor1 = wrapper.find('.firstIndex');

    expect(wrapper.vm.focusEventKey).toEqual('test-list-1');
    anchor1.trigger('keydown', {key: 'o'});
    expect(wrapper.vm.focusEventKey).toEqual('test-list-3');
  });

  it('should move focus to active on list blur', () => {
    const wrapper = mount(List, {
      propsData: {
        shouldFocusActive: true
      },
      slots: {
        default: `<md-list-item class='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <md-list-item class='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <md-list-item class='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />`
      }
    });

    const anchor1 = wrapper.find('.firstIndex');
    // trigger move focus up
    expect(wrapper.vm.focusEventKey).toEqual('test-list-1');
    anchor1.trigger('keydown', {key: 'ArrowUp'});
    // trigger click on focus
    wrapper.find(`#${wrapper.vm.focusEventKey}`).trigger('click');
    expect(wrapper.vm.activeEventKey).toEqual('test-list-3');
    // trigger move focus up
    wrapper.find(`#${wrapper.vm.focusEventKey}`).trigger('keydown', {key: 'ArrowUp'});
    expect(wrapper.vm.focusEventKey).toEqual('test-list-2');
    // trigger tab exit from List
    wrapper.find(`#${wrapper.vm.focusEventKey}`).trigger('keydown', {key: 'Tab'});
    expect(wrapper.vm.focusEventKey).toEqual('test-list-3');
  });

  it('should initially set focus and active values', () => {
    const wrapper = mount(List, {
      propsData: {
        active: 'test-list-2',
        shouldFocusActive: true,
        focusFirst: false,
      },
      slots: {
        default: `<md-list-item class='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <md-list-item class='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <md-list-item class='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />`
      }
    });

    expect(wrapper.vm.activeEventKey).toEqual('test-list-2');
    expect(wrapper.vm.focusEventKey).toEqual('test-list-2');
    expect(wrapper.findAll('.md-list-item').at(0).attributes().tabindex).toEqual('-1');
    expect(wrapper.findAll('.md-list-item').at(1).attributes().tabindex).toEqual('0');
    expect(wrapper.findAll('.md-list-item').at(2).attributes().tabindex).toEqual('-1');
    expect(document.hasFocus()).toEqual(false);
    expect(document.activeElement.id).toEqual('');
  });

  it('should initially focus on active item', () => {
    const wrapper = mount(List, {
      propsData: {
        active: 'test-list-2',
        shouldFocusActive: true,
        focusFirst: true,
      },
      slots: {
        default: `<md-list-item class='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <md-list-item class='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <md-list-item class='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />`
      }
    });

    expect(wrapper.vm.activeEventKey).toEqual('test-list-2');
    expect(wrapper.vm.focusEventKey).toEqual('test-list-2');
    expect(wrapper.findAll('.md-list-item').at(0).attributes().tabindex).toEqual('-1');
    expect(wrapper.findAll('.md-list-item').at(1).attributes().tabindex).toEqual('0');
    expect(wrapper.findAll('.md-list-item').at(2).attributes().tabindex).toEqual('-1');
    expect(document.hasFocus()).toEqual(true);
    expect(document.activeElement.id).toEqual('test-list-2');
  });

  it('should not track active', () => {
    const wrapper = mount(List, {
      propsData: {
        trackActive: false,
      },
      slots: {
        default: `<md-list-item class='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <md-list-item class='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <md-list-item class='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />`
      }
    });

    const anchor1 = wrapper.find('.firstIndex');
    // trigger move focus up
    expect(wrapper.vm.focusEventKey).toEqual('test-list-1');
    anchor1.trigger('keydown', {key: 'ArrowUp'});
    // trigger click on focus
    wrapper.find(`#${wrapper.vm.focusEventKey}`).trigger('click');
    expect(wrapper.vm.activeEventKey).toEqual(undefined);
  });

  it('should loop by default', () => {
    const wrapper = mount(List, {
      slots: {
        default: `<md-list-item class='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <md-list-item class='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <md-list-item class='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />`
      }
    });

    const anchor1 = wrapper.find('.firstIndex');

    expect(wrapper.vm.focusEventKey).toEqual('test-list-1');
    anchor1.trigger('keydown', {key: 'ArrowUp'});
    expect(wrapper.vm.focusEventKey).toEqual('test-list-3');
  });

  it('should not loop when shouldLoop={false}', () => {
    const wrapper = mount(List, {
      propsData: {
        shouldLoop: false,
      },
      slots: {
        default: `<md-list-item class='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <md-list-item class='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <md-list-item class='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />`
      }
    });

    const anchor1 = wrapper.find('.firstIndex');

    expect(wrapper.vm.focusEventKey).toEqual('test-list-1');
    anchor1.trigger('keydown', {key: 'ArrowUp'});
    expect(wrapper.vm.focusEventKey).toEqual('test-list-1');
  });

  it('should handle focusFirst prop', () => {
    const wrapper = mount(List, {
      propsData: {
        focusFirst: false,
      },
      slots: {
        default: `<md-list-item class='firstIndex' label="test" id='test-list-1' link='javscript:void(0)' />
        <md-list-item class='secondIndex' label="test" id='test-list-2' link='javscript:void(0)' />
        <md-list-item class='thirdIndex' label="test" id='test-list-3' link='javscript:void(0)' />`
      }
    });

    expect(wrapper.vm.focusEventKey).toEqual(undefined);
  });
});

