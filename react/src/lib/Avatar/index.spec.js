import React from 'react';
import { shallow, mount } from 'enzyme';
import Avatar from '../Avatar';
import Icon from '../Icon';

describe('tests for <Avatar />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Avatar/>);

    expect(container).toMatchSnapshot();
  });

  it('sequence of image load  ', () => {
    const container = mount(<Avatar src="test.png" title="Test Name"/>);

    expect(container.find('.cui-avatar__img').hasClass('cui-avatar__img--hidden')).toEqual(true);
    expect(container.find('.cui-avatar__letter').length).toEqual(1);
    container.find('.cui-avatar__img').simulate('load');
    expect(container.find('.cui-avatar__img').hasClass('cui-avatar__img--hidden')).toEqual(false);
    expect(container.find('.cui-avatar__letter').length).toEqual(0);
  });

  it('should display title for user', () => {
    const container = mount(<Avatar src="test.png" title="Test Name"/>);
    expect(container.find('.cui-avatar__letter').text()).toEqual('TN');
  });

  it('should display title for group', () => {
    const container = mount(<Avatar src="test.png" title="Test Group" type="group"/>);
    expect(container.find('.cui-avatar__letter').text()).toEqual('T');
  });

  it('should display title for group', () => {
    const container = mount(<Avatar src="test.png" title="Test Group" type="group"/>);
    expect(container.find('.cui-avatar__letter').text()).toEqual('T');
    expect(container.find('.cui-avatar').props().title).toEqual('Test Group');
  });

  describe('should apply respective classes for types', () => {

    it('when the type is group', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="group"/>);
      expect(container.find('.cui-avatar--group').length).toEqual(1);
    });

    it('when the type is active', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="active"/>);
      expect(container.find('.cui-avatar--active').length).toEqual(1);
    });

    it('when the type is inactive', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="inactive"/>);
      expect(container.find('.cui-avatar--inactive').length).toEqual(1);
    });

    it('when the type is Do Not Disturb', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="dnd"/>);
      expect(container.find('.cui-avatar--dnd').length).toEqual(1);
    });

    it('when the type is Out of Office', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" type="ooo"/>);
      expect(container.find('.cui-avatar--ooo').length).toEqual(1);
    });

  });

  describe('should apply respective classes for size', () => {

    it('when size is medium(default)', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" />);
      expect(container.find('.cui-avatar--medium').length).toEqual(1);
    });
    it('when size is xsmall', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size="xsmall"/>);
      expect(container.find('.cui-avatar--xsmall').length).toEqual(1);
    });
    it('when size is small', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size="small"/>);
      expect(container.find('.cui-avatar--small').length).toEqual(1);
    });
    it('when size is large', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size="large"/>);
      expect(container.find('.cui-avatar--large').length).toEqual(1);
    });
    it('when size is xlarge', () => {
      const container = mount(<Avatar src="test.png" title="Test Group" size="xlarge"/>);
      expect(container.find('.cui-avatar--xlarge').length).toEqual(1);
    });

  });

  it('should display icon', () => {
    const container = shallow(<Avatar icon={<Icon name="test"/>}/>);
    expect(container.find('.cui-avatar__icon').length).toEqual(1);
  });

  it('should display tooltip', () => {
    const container = shallow(<Avatar title="test title" hideDefaultTooltip/>);
    expect(container.find('.cui-avatar').props().title).toEqual('');
  });
});
