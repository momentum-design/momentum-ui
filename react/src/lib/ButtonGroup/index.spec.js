import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button, ButtonGroup, Icon } from '@collab-ui/react';

describe('tests for <ButtonGroup />', () => {
  it('should match SnapShot', () => {
    const container = shallow(
      <ButtonGroup>
        <Button ariaLabel="test">1</Button>
      </ButtonGroup>);

    expect(container).toMatchSnapshot();
  });

  it('should focus button wrt focus prop', () => {
    const container = mount(
      <ButtonGroup focus={1}>
        <Button ariaLabel="test">1</Button>
        <Button ariaLabel="test" disabled>2</Button>
        <Button ariaLabel="test">3</Button>
      </ButtonGroup>);

    expect(container.find('button').at(2).props().tabIndex).toEqual(0);
  });

  it('ButtonGroup should have justified as true', () => {
    const container = mount(
      <ButtonGroup>
        <Button ariaLabel="test">1</Button>
        <Button ariaLabel="test">2</Button>
      </ButtonGroup>);

    expect(container.find('.cui-button-group').hasClass('cui-button-group--justified')).toEqual(true);
  });

  it('ButtonGroup type is set to space', () => {
    const container = mount(
      <ButtonGroup type="space">
        <Button ariaLabel="test">1</Button>
        <Button ariaLabel="test">2</Button>
      </ButtonGroup>);

    expect(container.find('.cui-button-group').hasClass('cui-button-group--space')).toEqual(true);
  });

  it('should not highlight the active button when highlightSelected is false', () => {
    const container = mount(
      <ButtonGroup highlightSelected={false}>
        <Button ariaLabel="test">1</Button>
        <Button ariaLabel="test">2</Button>
      </ButtonGroup>);

    container.find('button').at(0).simulate('click');
    expect(container.find('button').at(0).hasClass('active')).toEqual(false);
  });

  it('should apply an modifier to button when Button contains Icon as a children', () => {
    const container = mount(
      <ButtonGroup type="space">
        <Button ariaLabel="test">
          <Icon name="icon-arrow-left_12"/>
        </Button>
      </ButtonGroup>);

    expect(container.find('button').at(0).hasClass('cui-button--icon')).toEqual(true);
  });


  it('onClick should should mark the button as active', () => {
    const container = mount(
      <ButtonGroup focus={0}>
        <Button ariaLabel="test">1</Button>
        <Button ariaLabel="test">2</Button>
      </ButtonGroup>);
    container.find('button').at(1).simulate('click');
    expect(container.find('button').at(1).props().tabIndex).toEqual(0);
    expect(container.find('button').at(1).hasClass('active')).toEqual(true);
  });

  it('should handle keyBoard keys', () => {
    const container = mount(
      <ButtonGroup focus={0}>
        <Button ariaLabel="test">1</Button>
        <Button ariaLabel="test">2</Button>
      </ButtonGroup>);
    expect(container.find('button').at(0).props().tabIndex).toEqual(0);
    expect(container.find('button').at(0).hasClass('active')).toEqual(true);
    // right
    container.find('button').at(0).simulate('keydown', { keyCode: 39, which: 39 });
    expect(container.find('button').at(1).props().tabIndex).toEqual(0);
    // left
    container.find('button').at(1).simulate('keydown', { keyCode: 37, which: 37 });
    expect(container.find('button').at(0).props().tabIndex).toEqual(0);
    // up key
    container.find('button').at(0).simulate('keydown', { keyCode: 38, which: 38 });
    expect(container.find('button').at(1).props().tabIndex).toEqual(0);

    // enter key
    container.find('button').at(1).simulate('keydown', { keyCode: 13, which: 13 });
    expect(container.find('button').at(1).hasClass('active')).toEqual(true);
  });

  it('should throw error if child is not an Button', () => {
    try {
      shallow(
          <ButtonGroup>
            <div/>
          </ButtonGroup>
      );
    } catch(e) {
      expect(e.message).toEqual('ButtonGroup should only contain Buttons as children.');
    }
  });

});
