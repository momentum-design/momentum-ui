import React from 'react';
import { shallow, mount } from 'enzyme';
import Popover from '../Popover';

describe.only('tests for <Popover />', () => {

  beforeAll(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  it('should match SnapShot', () => {
    const content = (
      <span key="1">Hello how are you doing</span>
    );
    const container = shallow(<Popover content={content}>
      <button>Hello</button>
    </Popover>);

    expect(container).toMatchSnapshot();
  });

  it('should render one Popover on click', () => {
    const content = (
      <span className="popover-content" key="1">Hello how are you doing</span>
    );
    const container = mount(<Popover content={content} popoverTrigger={'Click'}>
      <button className="anchor">Hello</button>
    </Popover>);

    container.find('.anchor').simulate('click');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('click');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });

  it('focus -> mouseEnter -> mouseLeave -> blur, when popover trigger is MouseEnter', () => {
    const content = (
      <span className="popover-content" key="1">Hello how are you doing</span>
    );
    const container = mount(<Popover content={content} popoverTrigger={'MouseEnter'}>
      <button tabIndex="0" className="anchor">Hello</button>
    </Popover>);

    container.find('.anchor').simulate('focus');
    jest.runAllTimers();
    container.update();
    expect(container.find('.cui-event-overlay__children').length).toEqual(1);

    container.find('.anchor').simulate('mouseenter');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('mouseleave');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('blur');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });

  it('focus -> mouseEnter -> blur -> mouseLeave, when popover trigger is MouseEnter', () => {
    const content = (
      <span className="popover-content" key="1">Hello how are you doing</span>
    );
    const container = mount(<Popover content={content} popoverTrigger={'MouseEnter'}>
      <button tabIndex="0" className="anchor">Hello</button>
    </Popover>);

    container.find('.anchor').simulate('focus');
    jest.runAllTimers();
    container.update();
    expect(container.find('.cui-event-overlay__children').length).toEqual(1);

    container.find('.anchor').simulate('mouseenter');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('blur');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);

    container.find('.anchor').simulate('mouseleave');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });

  it('should render one Popover on mouseenter', () => {
    const content = (
      <span className="popover-content" key="1">Hello how are you doing</span>
    );
    const container = mount(<Popover content={content} popoverTrigger={'MouseEnter'}>
      <button tabIndex="0" className="anchor">Hello</button>
    </Popover>);

    container.find('.anchor').simulate('mouseenter');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('mouseleave');
    jest.runAllTimers();
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });

  it('when show and hide with delay', () => {
    const content = (
      <span className="popover-content" key="1">Hello how are you doing</span>
    );
    const container = mount(<Popover content={content} popoverTrigger={'MouseEnter'} showDelay={200} hideDelay={100}>
      <button tabIndex="0" className="anchor">Hello</button>
    </Popover>);

    container.find('.anchor').simulate('mouseenter');
    jest.runTimersToTime(300);
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);
    
    container.find('.anchor').simulate('mouseleave');
    jest.runTimersToTime(200);    
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });


  it('when show and hide with delay', () => {
    const content = (
      <span className="popover-content" key="1">Hello how are you doing</span>
    );
    const container = mount(<Popover content={content} popoverTrigger={'MouseEnter'} delay={100}>
      <button tabIndex="0" className="anchor">Hello</button>
    </Popover>);

    container.find('.anchor').simulate('mouseenter');
    jest.runTimersToTime(200);
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    container.find('.anchor').simulate('mouseleave');
    jest.runTimersToTime(99);
    container.update();
    expect(container.find('.popover-content').length).toEqual(1);

    jest.runTimersToTime(200);
    container.update();
    expect(container.find('.popover-content').length).toEqual(0);
  });
});
