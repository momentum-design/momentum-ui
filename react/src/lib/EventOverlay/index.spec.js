import React from 'react';
import { shallow, mount } from 'enzyme';
import { EventOverlay, Popover } from '@collab-ui/react';

describe('tests for <EventOverlay />', () => {

  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('should match text SnapShot', () => {
    const props = {
      anchorNode: <div />
    };

    const container = shallow(
      <EventOverlay {...props}>
        <span>Test</span>
      </EventOverlay>
    );

    expect(container).toMatchSnapshot();
  });

  describe('should set classes for', () => {
    const content = (
      <span className="popover-content" key="1">Hello how are you doing</span>
    );

    it('top-center direction', () => {
      const container = mount(
        <Popover
          direction="top-center"
          showArrow
          content={content}
          popoverTrigger={'MouseEnter'}
        >
          <button tabIndex={0} className="anchor">Hello</button>
        </Popover>
      );

      container.find('.anchor').simulate('mouseenter');
      jest.runAllTimers();
      container.update();
      expect(container.find('.cui-event-overlay--top').length).toEqual(1);
      expect(container.find('.cui-event-overlay--arrow').length).toEqual(1);
    });

    it('bottom-center direction', () => {
      const container = mount(
        <Popover
          direction="bottom-center"
          showArrow
          content={content}
          popoverTrigger={'MouseEnter'}
        >
          <button tabIndex={0} className="anchor">Hello</button>
        </Popover>
      );

      container.find('.anchor').simulate('mouseenter');
      jest.runAllTimers();
      container.update();
      expect(container.find('.cui-event-overlay--bottom').length).toEqual(1);
    });

    it('left-center direction', () => {
      const container = mount(
        <Popover
          direction="left-center"
          showArrow
          content={content}
          popoverTrigger={'MouseEnter'}
        >
          <button tabIndex={0} className="anchor">Hello</button>
        </Popover>
      );

      container.find('.anchor').simulate('mouseenter');
      jest.runAllTimers();
      container.update();
      expect(container.find('.cui-event-overlay--left').length).toEqual(1);
    });

    it('right-center direction', () => {
      const container = mount(
        <Popover
          direction="right-center"
          showArrow
          content={content}
          popoverTrigger={'MouseEnter'}
        >
          <button tabIndex={0} className="anchor">Hello</button>
        </Popover>
      );

      container.find('.anchor').simulate('mouseenter');
      jest.runAllTimers();
      container.update();
      expect(container.find('.cui-event-overlay--right').length).toEqual(1);
    });
  });

  it('on click outside, should close the popover', () => {
    const content = (
      <span className="popover-content" key="1">Hello how are you doing</span>
    );

    const container = mount(
      <div className="wrapper">
        <Popover
          allowClickAway
          direction="top-center"
          showArrow
          content={content}
          popoverTrigger={'Click'}
        >
          <button tabIndex={0} className="anchor">Hello</button>
        </Popover>
      </div>
    );

    container.find('.anchor').simulate('click');
    expect(container.find('.cui-event-overlay--top').length).toEqual(1);

    // making a click outside
    container.childAt(0).childAt(0).childAt(1).instance().handleClick({});
    expect(container.find('.cui-event-overlay--top').length).toEqual(1);
  });

  it('on focus outside, should close the popover', () => {
    const content = (
      <span className="popover-content" key="1">Hello how are you doing</span>
    );

    const container = mount(
      <div className="wrapper">
        <Popover
          allowClickAway
          direction="top-center"
          showArrow
          content={content}
          popoverTrigger={'Focus'}
        >
          <button tabIndex={0} className="anchor">Hello</button>
        </Popover>
      </div>
    );

    container.find('.anchor').simulate('focus');
    jest.runAllTimers();
    container.update();
    expect(container.find('.cui-event-overlay--top').length).toEqual(1);

    // when tabbed out of the Overlay
    container.childAt(0).childAt(0).childAt(1).instance().handleClick({});
    expect(container.find('.cui-event-overlay--top').length).toEqual(1);
  });
});
