import React from 'react';
import { shallow, mount } from 'enzyme';
import SpaceListItem from '@collab-ui/react/SpaceListItem';

describe('tests for <SpaceListItem />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<SpaceListItem header="header" />);

    expect(container).toMatchSnapshot();
  });

  it('should render childrenLeft', () => {
    const container = mount(
      <SpaceListItem
        header="header"
        childrenLeft={<div className="test">Test</div>}
      />
    );

    expect(container.find('.test').length).toEqual(1);
  });

  it('should render childrenRight', () => {
    const container = mount(
      <SpaceListItem
        header="header"
        childrenRight={<div className="test">Test</div>}
      />
    );

    expect(container.find('.test').length).toEqual(1);
  });

  it('should render one SpaceListItem', () => {
    const container = mount(<SpaceListItem header="header" />);

    expect(container.find('.cui-list-item--space').exists()).toEqual(true);
  });

  it('should handle isOverview prop', () => {
    const container = mount(<SpaceListItem isOverview header="header" />);

    expect(container.find('.cui-list-item__header--overview').length).toEqual(
      1
    );
    expect(container.find('.cui-avatar__icon--overview').length).toEqual(1);
  });

  it('should handle className prop', () => {
    const container = mount(
      <SpaceListItem className="menuItem" header="header" />
    );

    expect(
      container.find('.cui-list-item--space').hasClass('menuItem')
    ).toEqual(true);
  });

  it('should handle header prop', () => {
    const container = mount(<SpaceListItem header="header" />);

    expect(container.find('.cui-list-item__header').text()).toEqual('header');
  });

  it('should handle subheader prop', () => {
    const container = mount(
      <SpaceListItem subheader="subheader" header="header" />
    );

    expect(container.find('.cui-list-item__subheader').text()).toEqual(
      'subheader'
    );
  });

  it('should handle isBold prop', () => {
    const container = mount(
      <SpaceListItem subheader="subheader" header="header" isBold />
    );

    expect(container.find('.cui-list-item--unread').exists()).toEqual(true);
  });

  describe('should handle logic of icon props', () => {
    it('should handle isAlertOn', () => {
      const container = mount(<SpaceListItem isAlertOn header="header" />);

      expect(container.find('title').text()).toEqual('Alert 12');
    });

    it('should prioritize isMentioned', () => {
      const container = mount(
        <SpaceListItem isAlertOn isMentioned header="header" />
      );

      expect(container.find('title').text()).toEqual('Mention 12');
    });

    it('should prioritize isUnread', () => {
      const container = mount(
        <SpaceListItem isUnread isAlertOn isMentioned header="header" />
      );

      expect(container.find('.icon-unread-badge_16').length).toEqual(1);
    });

    it('should prioritize isMuted', () => {
      const container = mount(
        <SpaceListItem isMuted isUnread isAlertOn isMentioned header="header" />
      );

      expect(container.find('.cui-list-item--unread').exists()).toEqual(false);
      expect(container.find('title').text()).toEqual('Alert Muted 12');
    });

    it('should prioritize childrenRight over icon', () => {
      const container = mount(
        <SpaceListItem
          isMuted
          isUnread
          isAlertOn
          isMentioned
          childrenRight={<div className="test">Test</div>}
          header="header"
        />
      );

      expect(container.find('.test').length).toEqual(1);
    });
  });

  it('should pass props to ListItem', () => {
    const customAnchorNode = <div className="custom-class" />;
    const container = mount(
      <SpaceListItem customAnchorNode={customAnchorNode} header="header" />
    );

    expect(container.find('.custom-class').length).toEqual(1);
  });
});
