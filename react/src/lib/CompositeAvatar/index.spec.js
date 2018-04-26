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
    expect(container.find('.cui-composite-avatar').hasClass('cui-composite-avatar--medium')).toEqual(true);
    expect(container.find('.cui-avatar').length).toEqual(2);

    container = mount(
      <CompositeAvatar size="small">
        <Avatar title="test1"/>
        <Avatar title="test2"/>
      </CompositeAvatar>
    );
    expect(container.find('.cui-composite-avatar').hasClass('cui-composite-avatar--small')).toEqual(true);
    expect(container.find('.cui-avatar').length).toEqual(2);

    container = mount(
      <CompositeAvatar size="large">
        <Avatar title="test1"/>
        <Avatar title="test2"/>
      </CompositeAvatar>
    );
    expect(container.find('.cui-composite-avatar').hasClass('cui-composite-avatar--large')).toEqual(true);
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

});
