import { mount } from '@vue/test-utils';
import ComboBox from '../index.vue';
import EventOverlay from '../../event-overlay/index.vue';
import Icon from '../../icon/index.vue';
import Input from '../../input/index.vue';
import InputSection from '../../input-section/index.vue';
import ListItem from '../../list-item/index.vue';
import ListItemHeader from '../../list-item-header/index.vue';
import ListItemSection from '../../list-item-section/index.vue';
import SearchInput from '../../input-search/index.vue';
import Vue from 'vue';

Vue.component(EventOverlay.name, EventOverlay);
Vue.component(Icon.name, Icon);
Vue.component(Input.name, Input);
Vue.component(InputSection.name, InputSection);
Vue.component(ListItem.name, ListItem);
Vue.component(ListItemHeader.name, ListItemHeader);
Vue.component(ListItemSection.name, ListItemSection);
Vue.component(SearchInput.name, SearchInput);

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

describe('ComboBox', () => {
  it('should match snapshot', () => {
    const wrapper = mount(ComboBox, {
      propsData: {
        options: ['a', 'ab', 'abc'],
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should apply class to ComboBox', () => {
    const container = mount(ComboBox, {
      propsData: {
        options: ['a', 'ab', 'abc'],
      },
      attrs: {
        class: 'test'
      }
    });
    expect(container.classes('test')).toEqual(true);
    expect(container.findAll(Input).length).toEqual(1);
  });

  it('should display search icon by default', () => {
    const container = mount(ComboBox, {
      propsData: {
        options: ['a', 'ab', 'abc'],
      },
    });
    expect(container.findAll(SearchInput).length).toEqual(1);
  });

  it('should not show searchIcon when hasSearchIcon is false', () => {
    const container = mount(ComboBox, {
      propsData: {
        options: ['a', 'ab', 'abc'],
        hasSearchIcon: false,
      },
    });
    expect(container.findAll('Input').length).toEqual(1);
  });

  it('should show options when search string is does exists', () => {
    const container = mount(ComboBox, {
      propsData: {
        options: ['a', 'ab', 'abc'],
      },
    });
    container.find('.md-input').element.value = 'a';
    container.find('.md-input').trigger('input');
    expect(container.findAll(ListItem).length).toEqual(3);

    container.find('.md-input').element.value = 'ab';
    container.find('.md-input').trigger('input');
    expect(container.findAll(ListItem).length).toEqual(2);

    container.find('.md-input').element.value = 'abc';
    container.find('.md-input').trigger('input');
    expect(container.findAll(ListItem).length).toEqual(1);
  });

  it('should not show any options when search string is does not exists', () => {
    const container = mount(ComboBox, {
      propsData: {
        options: ['a', 'ab', 'abc'],
      },
    });
    container.find('.md-input').element.value = 'xyz';
    container.find('.md-input').trigger('input');
    expect(container.findAll(ListItem).length).toEqual(0);

  });

  it('should close the options list when an option is selected', () => {
    const onSelectFn = jest.fn();
    const container = mount(ComboBox, {
      propsData: {
        options: ['a', 'ab', 'abc'],
      },
      listeners: {
        select: onSelectFn
      },
    });
    container.find('.md-input').element.value = 'a';
    container.find('.md-input').trigger('input');
    expect(container.findAll(ListItem).length).toEqual(3);

    // select 'ab' option
    container.findAll('.md-list-item').at(1).trigger('click');
    expect(container.find('.md-input').attributes().value).toEqual('ab');
    expect(container.findAll(ListItem).length).toEqual(0);
    expect(onSelectFn).toHaveBeenCalled();

    // click back on input tag, should open the options list once again
    container.find('.md-input').trigger('click');
    expect(container.findAll(ListItem).length).toEqual(2);
  });

  it('should handle keyBoard events', () => {
    const onSelectFn = jest.fn();
    const container = mount(ComboBox, {
      propsData: {
        options: ['a', 'ab', 'abc'],
      },
      listeners: {
        select: onSelectFn
      },
    });
    container.find('.md-input').element.value = 'a';
    container.find('.md-input').trigger('input');
    expect(container.findAll(ListItem).length).toEqual(3);

    // focus first option using keyBoard
    container.find('.md-input').trigger('keydown.down');
    expect(container.findAll('.md-list-item').at(0).classes('active')).toEqual(true);

    // focus second option using keyBoard
    container.find('.md-input').trigger('keydown.down');
    expect(container.findAll('.md-list-item').at(1).classes('active')).toEqual(true);


    container.find('.md-input').trigger('keydown.enter');
    expect(container.find('.md-input').attributes().value).toEqual('ab');
    expect(container.findAll(ListItem).length).toEqual(0);
    expect(onSelectFn).toHaveBeenCalled();

  });

  it('should handle keyBoard events with few items disabled', () => {
    const onSelectFn = jest.fn();
    const container = mount(ComboBox, {
      slots: {
        default: `<md-list-item :disabled="true" label="x" /><md-list-item label="xy" /><md-list-item label="xyz" />`
      },
      listeners: {
        select: onSelectFn
      },
    });
    container.find('.md-input').element.value = 'x';
    container.find('.md-input').trigger('input');
    expect(container.findAll(ListItem).length).toEqual(3);

    // focus on the second option since first one is disabled, on down key
    container.find('.md-input').trigger('keydown.down');
    expect(container.findAll('.md-list-item').at(1).classes('active')).toEqual(true);

    // focus third option on down key
    container.find('.md-input').trigger('keydown.down');
    expect(container.findAll('.md-list-item').at(2).classes('active')).toEqual(true);


    // focus on first option on down key
    container.find('.md-input').trigger('keydown.down');
    expect(container.findAll('.md-list-item').at(1).classes('active')).toEqual(true);

  });

  it('on click outside, should close the options list', () => {
    const container = mount(ComboBox, {
      propsData: {
        options: ['a', 'ab', 'abc'],
      },
    });

    container.find('.md-input').element.value = 'a';
    container.find('.md-input').trigger('input');
    expect(container.findAll(ListItem).length).toEqual(3);

    // Dispatch click outside Event
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, true);
    document.dispatchEvent(evt);

    expect(container.findAll(ListItem).length).toEqual(0);
  });

  it('should render ListItem nodes as options if passed as ComboBox children', () => {
    const container = mount(ComboBox, {
      propsData: {
        options: ['a', 'ab']
      },
      slots: {
        default: `<md-list-item label="x" ><div class="content-1" /></md-list-item><md-list-item label="xy" ><div class="content-2" /></md-list-item>`
      },
    });
    container.find('.md-input').element.value = 'x';
    container.find('.md-input').trigger('input');
    expect(container.findAll(ListItem).length).toEqual(2);

    expect(container.findAll(ListItem).at(0).findAll('.content-1').length).toEqual(1);
    expect(container.findAll(ListItem).at(1).findAll('.content-2').length).toEqual(1);

    container.findAll('.md-list-item').at(1).trigger('click');
    expect(container.find('.md-input').attributes().value).toEqual('xy');

    container.find('.md-input').element.value = 'a';
    container.find('.md-input').trigger('input');
    expect(container.findAll(ListItem).length).toEqual(0);
  });

  it('should render ListItemHeader if passed as ComboBox children', () => {
    const container = mount(ComboBox, {
      slots: {
        default: `<md-list-item-header header='test header' /><md-list-item label="x" ><div class="content-1" /></md-list-item>`
      },
    });

    container.find('.md-input').element.value = 'z';
    container.find('.md-input').trigger('input');

    expect(container.find(ListItemHeader).exists()).toEqual(true);
    expect(container.findAll(ListItem).at(0).find('.content-1').exists()).toEqual(false);

    container.find(ListItemHeader).trigger('click');
    expect(container.find('.md-input').attributes().value).toEqual('z');
  });

});

