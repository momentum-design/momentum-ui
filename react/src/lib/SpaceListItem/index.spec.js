import React from 'react';
import { shallow, mount } from 'enzyme';
import SpaceListItem from '@collab-ui/react/SpaceListItem';

describe('tests for <SpaceListItem />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<SpaceListItem header='header'/>);

    expect(container).toMatchSnapshot();
  });

  it('should render one SpaceListItem', () => {
    const container = mount(<SpaceListItem header='header' />);

    expect(container.find('.cui-list-item--space').exists()).toEqual(true);
  });

  it('should handle className prop', () => {
    const container = mount(<SpaceListItem className='menuItem' header='header'/>);

    expect(container.find('.cui-list-item--space').hasClass('menuItem')).toEqual(true);
  });

  it('should handle header prop', () => {
    const container = mount(<SpaceListItem header='header'/>);

    expect(container.find('.cui-list-item__header').text()).toEqual('header');
  });

  it('should handle subheader prop', () => {
    const container = mount(<SpaceListItem subheader='subheader' header='header'/>);

    expect(container.find('.cui-list-item__subheader').text()).toEqual('subheader');
  });

  it('should handle isUnread', () => {
    const container = mount(<SpaceListItem isUnread header='header'/>);

    expect(container.find('.cui-list-item--unread').exists()).toEqual(true);
    expect(container.find('.cui-icon').length).toEqual(1);
  });

  it('should pass props to ListItem', () => {
    const customAnchorNode = <div className='custom-class' />;
    const container = mount(<SpaceListItem customAnchorNode={customAnchorNode} header='header'/>);

    expect(container.find('.custom-class').length).toEqual(1);
  });
});

