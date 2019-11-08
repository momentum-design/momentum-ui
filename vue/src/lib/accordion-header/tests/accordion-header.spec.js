import { mount, shallowMount } from '@vue/test-utils';
import AccordionHeader from '../index.vue';

describe('AccordionHeader', () => {
  it('should match snapshot', () => {
    const wrapper = mount(AccordionHeader);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render children', () => {
    const container = shallowMount(AccordionHeader, {
      slots: {
        default: `<div class="testingforTC" />`
      }
    });

    expect(container.findAll('.testingforTC').length).toEqual(1);
  });

  it('should pass class attr', () => {
    const container = shallowMount(AccordionHeader, {
      attrs: {
        class: 'testClass'
      }
    });

    expect(container.find('.testClass').exists()).toEqual(true);
    expect(container.attributes().tabindex).toEqual('0');
  });

  it('when the header is disabled, should set tabindex to -1', () => {
    const container = shallowMount(AccordionHeader, {
      propsData: {
        disabled: true
      }
    });
    expect(container.attributes().tabindex).toEqual('-1');
  });

  it('when the showSeparator prop is true, should display the separator', () => {
    const container = shallowMount(AccordionHeader, {
      propsData: {
        disabled: true,
        showSeparator: true,
      }
    });
    expect(container.classes('md-accordion__header--separator')).toEqual(true);
  });

  it('when height prop is set, should apply height style to header', () => {
    const container = shallowMount(AccordionHeader, {
      propsData: {
        disabled: true,
        showSeparator: true,
        height: 56,
      }
    });
    
    expect(container.classes('md-accordion__header--56')).toEqual(true);
  });

  it('should call the context handler function on click and keyDown event', () => {
    const onClickFn = jest.fn();
    const onKeyDownFn = jest.fn();
    const container = mount(AccordionHeader, {
      provide: {
        onClick: onClickFn,
        onKeydown: onKeyDownFn,
      }
    });
    container.trigger('click');
    expect(onClickFn).toHaveBeenCalled();
    container.trigger('keydown');
    expect(onKeyDownFn).toHaveBeenCalled();
  });
});

