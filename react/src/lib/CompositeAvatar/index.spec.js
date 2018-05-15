import React from 'react';
import { shallow, mount } from 'enzyme';
import CompositeAvatar from '../CompositeAvatar';
import Avatar from '../Avatar';

describe('tests for <CompositeAvatar />', () => {
  it('should match SnapShot', () => {
    const container = shallow(
      <CompositeAvatar>
        <Avatar title="test1"/>
        <Avatar title="test2"/>
      </CompositeAvatar>
    );

    expect(container).toMatchSnapshot();
  });

  it('composite avatars of different sizes  ', () => {
    let container = mount(
      <CompositeAvatar>
        <Avatar title="test1"/>
        <Avatar title="test2"/>
      </CompositeAvatar>
    );
    expect(container.find('.cui-composite-avatar').props().style.height).toEqual('40px');
    expect(container.find('.cui-composite-avatar').props().style.width).toEqual('40px');
    expect(container.find('.cui-avatar').length).toEqual(2);

    container = mount(
      <CompositeAvatar size="small">
        <Avatar title="test1"/>
        <Avatar title="test2"/>
      </CompositeAvatar>
    );
    expect(container.find('.cui-composite-avatar').props().style.height).toEqual('28px');
    expect(container.find('.cui-composite-avatar').props().style.width).toEqual('28px');
    expect(container.find('.cui-avatar').length).toEqual(2);

    container = mount(
      <CompositeAvatar size="large">
        <Avatar title="test1"/>
        <Avatar title="test2"/>
      </CompositeAvatar>
    );
    expect(container.find('.cui-composite-avatar').props().style.height).toEqual('135px');
    expect(container.find('.cui-composite-avatar').props().style.width).toEqual('135px');
    expect(container.find('.cui-avatar').length).toEqual(2);
  });

  it('should throw an error when 2 Avatar components are not present as children', () => {
    try{
      shallow(
        <CompositeAvatar size="large">
          <Avatar title="test2"/>
        </CompositeAvatar>
      );
    } catch(e) {
      expect(e.message).toEqual('Children should have 2 Avatar component');
    }
    try{
      shallow(
        <CompositeAvatar size="large">
          <div/>
          <div/>
        </CompositeAvatar>
      );
    } catch(e) {
      expect(e.message).toEqual('Children should have 2 Avatar component');
    }
  });

  it('overrideSize should override the size prop', () => {
    const container = mount(
        <CompositeAvatar overrideSize={45} size="medium">
          <Avatar title="test1"/>
          <Avatar title="test2"/>
        </CompositeAvatar>
    );
    expect(container.find('.cui-composite-avatar').props().style.height).toEqual('45px');
    expect(container.find('.cui-composite-avatar').props().style.width).toEqual('45px');
  });

});
