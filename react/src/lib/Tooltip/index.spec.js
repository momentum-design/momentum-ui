import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  Button,
  Tooltip,
} from '@collab-ui/react';

describe('tests for <Tooltip />', () => {
  beforeAll(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  it('should match SnapShot', () => {
    const container = shallow(
      <Tooltip tooltip="test">
        <div>Hi</div>
      </Tooltip>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render on click', () => {
    const container = mount(
      <Tooltip tooltip="test" tooltipTrigger="Click">
        <Button children="test button" ariaLabel="test" />
      </Tooltip>
    );

    const button = container.find('button');
    button.simulate('click');
    jest.runAllTimers();
    container.update();

    expect(container.find('.cui-tooltip__text').text()).toEqual('test');
  });

  it('should render on Hover', () => {
    const container = mount(
      <Tooltip tooltip="test" tooltipTrigger="MouseEnter">
        <Button children="test button" ariaLabel="test" />
      </Tooltip>
    );

    const button = container.find('button');
    button.simulate('mouseenter');
    jest.runAllTimers();
    container.update();

    expect(container.find('.cui-tooltip__text').text()).toEqual('test');
  });

  it('should render on Focus', () => {
    const container = mount(
      <Tooltip tooltip="test" tooltipTrigger="Focus">
        <Button children="test button" ariaLabel="test" />
      </Tooltip>
    );

    const button = container.find('button');
    button.simulate('focus');
    jest.runAllTimers();
    container.update();

    expect(container.find('.cui-tooltip__text').text()).toEqual('test');
  });

  it('should parse direction correctly (top)', () => {
    const container = mount(
      <Tooltip tooltip="test" tooltipTrigger="Click" direction="top-center">
        <Button children="test button" ariaLabel="test" />
      </Tooltip>
    );
    const button = container.find('button');
    button.simulate('click');
    jest.runAllTimers();
    container.update();

    expect(container.find('.cui-event-overlay--top').length).toEqual(1);
  });

  it('should parse direction correctly (top-left)', () => {
    const container = mount(
      <Tooltip tooltip="test" tooltipTrigger="Click" direction="top-left">
        <Button children="test button" ariaLabel="test" />
      </Tooltip>
    );
    const button = container.find('button');
    button.simulate('click');
    jest.runAllTimers();
    container.update();

    expect(container.find('.cui-event-overlay--top').length).toEqual(1);
  });

  it('should parse direction correctly (top-right)', () => {
    const container = mount(
      <Tooltip tooltip="test" tooltipTrigger="Click" direction="top-right">
        <Button children="test button" ariaLabel="test" />
      </Tooltip>
    );
    const button = container.find('button');
    button.simulate('click');
    jest.runAllTimers();
    container.update();

    expect(container.find('.cui-event-overlay--top').length).toEqual(1);
  });

  it('should parse direction correctly (bottom)', () => {
    const container = mount(
      <Tooltip tooltip="test" tooltipTrigger="Click" direction="bottom-center">
        <Button children="test button" ariaLabel="test" />
      </Tooltip>
    );
    const button = container.find('button');
    button.simulate('click');
    jest.runAllTimers();
    container.update();

    expect(container.find('.cui-event-overlay--bottom').length).toEqual(1);
  });

  it('should parse direction correctly (bottom-left)', () => {
    const container = mount(
      <Tooltip tooltip="test" tooltipTrigger="Click" direction="bottom-left">
        <Button children="test button" ariaLabel="test" />
      </Tooltip>
    );

    const button = container.find('button');
    button.simulate('click');
    jest.runAllTimers();
    container.update();
    expect(container.find('.cui-event-overlay--bottom').length).toEqual(1);
  });

  it('should parse direction correctly (bottom-right)', () => {
    const container = mount(
      <Tooltip tooltip="test" tooltipTrigger="Click" direction="bottom-right">
        <Button children="test button" ariaLabel="test" />
      </Tooltip>
    );

    const button = container.find('button');
    button.simulate('click');
    jest.runAllTimers();
    container.update();
    expect(container.find('.cui-event-overlay--bottom').length).toEqual(1);
  });

  it('should parse direction correctly (left)', () => {
    const container = mount(
      <Tooltip tooltip="test" tooltipTrigger="Click" direction="left-center">
        <Button children="test button" ariaLabel="test" />
      </Tooltip>
    );
    const button = container.find('button');
    button.simulate('click');
    jest.runAllTimers();
    container.update();

    expect(container.find('.cui-event-overlay--left').length).toEqual(1);
  });

  it('should parse direction correctly (right)', () => {
    const container = mount(
      <Tooltip tooltip="test" tooltipTrigger="Click" direction="right-center">
        <Button children="test button" ariaLabel="test" />
      </Tooltip>
    );
    const button = container.find('button');
    button.simulate('click');
    jest.runAllTimers();
    container.update();

    expect(container.find('.cui-event-overlay--right').length).toEqual(1);
  });

  it('should set the width attribute when passed', () => {
    const container = mount(
      <Tooltip tooltip="test" tooltipTrigger="Click" width={100}>
        <Button children="test button" ariaLabel="test" />
      </Tooltip>
    );
    const button = container.find('button');
    button.simulate('click');
    jest.runAllTimers();
    container.update();

    expect(container.find('.cui-tooltip__text').prop('style').width).toEqual(
      '100px'
    );
  });
});
