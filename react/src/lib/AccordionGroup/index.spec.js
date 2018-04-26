import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  AccordionGroup,
  AccordionContent,
  AccordionHeader,
} from '@collab-ui/react';

describe('tests for <AccordionGroup />', () => {
  it('should match SnapShot', () => {
    const container = shallow(
      <AccordionGroup>
        <AccordionHeader/>
        <AccordionContent/>
      </AccordionGroup>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render children', () => {
    const container = mount(
      <AccordionGroup isExpanded>
        <AccordionHeader/>
        <AccordionContent/>
      </AccordionGroup>
    );
    const group = container.find('.cui-accordion__group');

    expect(group.length).toEqual(1);
    expect(group.hasClass('cui-accordion__group--active')).toEqual(true);
    expect(group.find('.cui-accordion__header').length).toEqual(1);
    expect(group.find('.cui-accordion__content').length).toEqual(1);
    expect(container.instance().props.isExpanded).toEqual(true);
  });

  it('should pass disabled and focus props to children', () => {
    const container = shallow(
      <AccordionGroup className="testClass" disabled focus>
        <AccordionHeader/>
        <AccordionContent/>
      </AccordionGroup>
    );
    const group = container.find('.cui-accordion__group');
    expect(group.hasClass('testClass')).toEqual(true);
    expect(group.hasClass('cui-accordion__group--disabled')).toEqual(true);
    expect(container.find('AccordionHeader').props().disabled).toEqual(true);
    expect(container.find('AccordionHeader').props().focus).toEqual(true);
  });

  it('should throw error if header and content are not present', () => {
    try {
      shallow(
        <AccordionGroup className="testClass" disabled focus/>
      );
    } catch(e) {
      expect(e.message).toEqual('AccordionGroup should contain 2 children AccordionHeader and AccordionContent respectively.');
    }
  });

});
