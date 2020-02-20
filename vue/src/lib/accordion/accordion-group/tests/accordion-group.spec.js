import { mount, shallowMount } from '@vue/test-utils';
import AccordionGroup from '../index.vue';
import AccordionContent from '../../accordion-content/index.vue';
import AccordionHeader from '../../accordion-header/index.vue';
import Vue from 'vue';

Vue.component(AccordionContent.name, AccordionContent);
Vue.component(AccordionHeader.name, AccordionHeader);

describe('AccordionGroup', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(AccordionGroup, {
      slots: {
        default: `<md-accordion-header /><md-accordion-content />`
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render children', () => {
    const container = mount(AccordionGroup, {
      propsData: {
        isExpanded: true
      },
      slots: {
        default: `<md-accordion-header /><md-accordion-content />`
      }
    });

    expect(container.classes('md-accordion__group--active')).toEqual(true);
    expect(container.findAll('.md-accordion__header').length).toEqual(1);
    expect(container.findAll('.md-accordion__content').length).toEqual(1);
    expect(container.vm.isExpanded).toEqual(true);
  });

  it('should pass class attr', () => {
    const container = shallowMount(AccordionGroup, {
      attrs: {
        class: 'testClass'
      },
      slots: {
        default: `<md-accordion-header /><md-accordion-content />`
      }
    });

    expect(container.classes('testClass')).toEqual(true);
  });

  it('should pass disabled, focus and showSeparator props to children', () => {
    const container = mount(AccordionGroup, {
      propsData: {
        disabled: true,
        focus: true,
        showSeparator: false,
      },
      slots: {
        default: `<md-accordion-header /><md-accordion-content />`
      }
    });

    expect(container.classes('md-accordion__group--disabled')).toEqual(true);
    expect(container.find(AccordionHeader).props().disabled).toEqual(true);
    expect(container.find(AccordionHeader).props().focus).toEqual(true);
    expect(container.find(AccordionHeader).props().showSeparator).toEqual(false);
  });

});

