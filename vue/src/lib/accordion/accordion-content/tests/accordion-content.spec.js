import { shallowMount } from '@vue/test-utils';
import AccordionContent from '../index.vue';

describe('AccordionContent', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(AccordionContent);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render one AccordionContent', () => {
    const container = shallowMount(AccordionContent);

    expect(container.findAll('.md-accordion__content').length).toEqual(1);
  });

  it('should pass ClassName Prop', () => {
    const container = shallowMount(AccordionContent, {
      attrs: {
        class: 'testClass'
      }
    });

    expect(container.find('.testClass').exists()).toEqual(true);
  });

  it('should render children', () => {
    const container = shallowMount(AccordionContent, {
      slots: {
        default: `<div class="testingforTC" />`
      }
    });

    expect(container.findAll('.testingforTC').length).toEqual(1);
  });
});

