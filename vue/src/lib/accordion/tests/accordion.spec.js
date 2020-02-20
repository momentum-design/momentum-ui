import { mount,shallowMount } from '@vue/test-utils';
import Accordion from '../index.vue';
import AccordionContent from '../accordion-content/index.vue';
import AccordionHeader from '../accordion-header/index.vue';
import AccordionGroup from '../accordion-group/index.vue';
import Vue from 'vue';

Vue.component(AccordionContent.name, AccordionContent);
Vue.component(AccordionHeader.name, AccordionHeader);
Vue.component(AccordionGroup.name, AccordionGroup);

describe('Accordion', () => {
  it('should match SnapShot', () => {
    const container = shallowMount(Accordion, {
      slots: {
        default: `<md-accordion-group>
        <md-accordion-header>
          <span>Hi</span>
        </md-accordion-header><md-accordion-content>
          <span>Hello</span>
        </md-accordion-content>
      </md-accordion-group>`
      }
    });

    expect(container).toMatchSnapshot();
  });

  it('with multipleVisible as true, multiple AccordionGroups can be open', () => {
    const onSelect = jest.fn();
    const container = mount(Accordion, {
      propsData: {
        multipleVisible: true,
      },
      attrs: {
        class: 'testClass'
      },
      listeners: {
        select: onSelect
      },
      slots: {
        default: `<md-accordion-group>
        <md-accordion-header>
          <span>Hi</span>
        </md-accordion-header><md-accordion-content>
          <span>Hello</span>
        </md-accordion-content>
      </md-accordion-group><md-accordion-group>
        <md-accordion-header>
          <span>Hi</span>
        </md-accordion-header><md-accordion-content>
          <span>Hello</span>
        </md-accordion-content>
      </md-accordion-group><md-accordion-group :disabled="true">
        <md-accordion-header>
          <span>Hi</span>
        </md-accordion-header><md-accordion-content>
          <span>Hello</span>
        </md-accordion-content>
      </md-accordion-group>`
      }
    });

    const firstGroup = container.findAll('.md-accordion__header').at(0);
    firstGroup.trigger('click');
    expect(container.findAll('.md-accordion__group').at(0).classes('md-accordion__group--active')).toEqual(true);
    expect(onSelect).toHaveBeenCalledWith([0]);
    expect(container.findAll(AccordionHeader).at(0).props().focus).toEqual(true);

    const secondGroup = container.findAll('.md-accordion__header').at(1);
    secondGroup.trigger('click');
    expect(container.findAll('.md-accordion__group').at(1).classes('md-accordion__group--active')).toEqual(true);
    expect(onSelect).toHaveBeenCalledWith([0, 1]);

    const thirdGroup = container.findAll('.md-accordion__header').at(2);
    thirdGroup.trigger('click');
    expect(container.findAll('.md-accordion__group').at(1).classes('md-accordion__group--active')).toEqual(true);
  });

  it('with multipleVisible prop as false, only one AccordionGroup can be open', () => {
    const onSelect = jest.fn();
    const container = mount(Accordion, {
      propsData: {
        multipleVisible: false,
        initialActive: [0]
      },
      listeners: {
        select: onSelect
      },
      slots: {
        default: `<md-accordion-group>
        <md-accordion-header>
          <span>Hi</span>
        </md-accordion-header><md-accordion-content>
          <span>Hello</span>
        </md-accordion-content>
      </md-accordion-group><md-accordion-group>
        <md-accordion-header>
          <span>Hi</span>
        </md-accordion-header><md-accordion-content>
          <span>Hello</span>
        </md-accordion-content>
      </md-accordion-group>`
      }
    });

    expect(container.findAll('.md-accordion__group').at(0).classes('md-accordion__group--active')).toEqual(true);

    const secondGroup = container.findAll('.md-accordion__header').at(1);
    secondGroup.trigger('click');
    expect(container.findAll('.md-accordion__group').at(1).classes('md-accordion__group--active')).toEqual(true);
    expect(onSelect).toHaveBeenCalledWith(1, 0);
    expect(container.findAll('.md-accordion__group').at(0).classes('md-accordion__group--active')).toEqual(false);
  });

  it('should clone children with props', () => {
    const container = mount(Accordion, {
      propsData: {
        showSeparator: false,
        initialActive: [0]
      },
      slots: {
        default: `<md-accordion-group>
        <md-accordion-header>
          <span>Hi</span>
        </md-accordion-header><md-accordion-content>
          <span>Hello</span>
        </md-accordion-content>
      </md-accordion-group>`
      }
    });

    expect(container.find(AccordionGroup).props().isExpanded).toEqual(true);
    expect(container.find(AccordionGroup).props().showSeparator).toEqual(false);
  });

  it('should add custom class', () => {
    const container = mount(Accordion, {
      attrs: {
        class: 'testClass'
      },
      slots: {
        default: `<md-accordion-group>
        <md-accordion-header>
          <span>Hi</span>
        </md-accordion-header><md-accordion-content>
          <span>Hello</span>
        </md-accordion-content>
      </md-accordion-group>`
      }
    });
    expect(container.find('.testClass').exists()).toEqual(true);
  });

});
