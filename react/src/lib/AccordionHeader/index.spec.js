import React from 'react';
import { shallow, mount } from 'enzyme';
import AccordionHeader from '../AccordionHeader';

describe('tests for <AccordionHeader />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<AccordionHeader />);

    expect(container).toMatchSnapshot();
  });

  it('should render children', () => {
    const container = shallow(
      <AccordionHeader>
        <div className="testingforTC" />
      </AccordionHeader>
    );
    expect(container.find('.testingforTC').length).toEqual(1);
  });

  it('should pass ClassName Prop', () => {
    const container = shallow(<AccordionHeader className="testClass"/>);

    expect(container.find('.testClass').exists()).toEqual(true);
    expect(container.find('.cui-accordion__header').props().tabIndex).toEqual(0);
  });

  it('when the header is disabled, should set tabIndex to -1', () => {
    const container = shallow(<AccordionHeader disabled />);
    expect(container.find('.cui-accordion__header').props().tabIndex).toEqual(-1);
  });

  it('should call the context handler function on click and keyDown event', () => {
    const onClickFn = jest.fn();
    const onKeyDownFn = jest.fn();
    const container = mount(<AccordionHeader/>, {
      context: {
        onClick: onClickFn,
        onKeyDown: onKeyDownFn,
      }
    });
    container.simulate('click');
    expect(onClickFn).toHaveBeenCalled();
    container.simulate('keyDown');
    expect(onKeyDownFn).toHaveBeenCalled();
  });

});
