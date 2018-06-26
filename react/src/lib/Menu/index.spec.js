import React from 'react';
import { shallow, mount } from 'enzyme';
import { Menu, MenuItem } from '@collab-ui/react';

describe('tests for <Menu />', () => {
  it('should render a Menu', () => {
    const wrapper = shallow(
      <Menu>
        <MenuItem label="one"/>
      </Menu>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should apply className to Menu', () => {
    const wrapper = mount(
      <Menu className="test">
        <MenuItem label="one"/>
      </Menu>
    );
    expect(wrapper.find('.cui-menu').hasClass('test')).toEqual(true);
  });

  it('should focus first non disabled/ non readOnly menuItem', () => {
    const wrapper = shallow(
      <Menu>
        <MenuItem label="one" isHeader/>
        <MenuItem label="two" disabled/>
        <MenuItem label="three"/>
      </Menu>
    );
    expect(wrapper.state().menuIndex).toEqual([2]);
    expect(wrapper.props().children[2].props.focus).toEqual(true);
  });

  it('should open/select the submenu', () => {
    let selectedIndex;
    const onSelect = (e, i) => selectedIndex = i;
    const wrapper = mount(
      <Menu>
        <MenuItem label="one">
          <MenuItem label="one-one" key="0"/>
        </MenuItem>
        <MenuItem label="two"/>
        <MenuItem label="three"/>
      </Menu>,
      { context: { onSelect } }
    );
    let menuItem = wrapper.find('MenuItem').at(0);
    // click first menu item
    menuItem.find('.cui-list-item').simulate('click');
    expect(selectedIndex).toEqual([0]);
    expect(wrapper.state().menuIndex).toEqual([0, 0]);

    // click on first subMenu Item
    menuItem = wrapper.find('.cui-menu-item').at(0);
    menuItem.find('.cui-event-overlay__children .cui-list-item').simulate('click');
    expect(selectedIndex).toEqual([0, 0]);
    expect(wrapper.state().menuIndex).toEqual([0]);
    expect(wrapper.find('MenuItem').at(0).props().focus).toEqual(true);
    expect(wrapper.find('MenuItem').at(0).props().isOpen).toEqual(false);
  });

  it('should handle key-board keys', () => {
    let selectedIndex;
    const onSelect = (e, i) => selectedIndex = i;
    const wrapper = mount(
      <Menu>
        <MenuItem label="one">
          <MenuItem label="one-one" key="0"/>
        </MenuItem>
        <MenuItem label="two"/>
        <MenuItem label="three"/>
      </Menu>,
      { context: { onSelect } }
    );

    // press down arrow
    let item = wrapper.find('MenuItem').at(0).find('.cui-list-item');
    item.simulate('keyDown', { which: 40 });
    expect(wrapper.state().menuIndex).toEqual([1]);

    // press up arrow
    item = wrapper.find('MenuItem').at(1).find('.cui-list-item');
    item.simulate('keyDown', { which: 38 });
    expect(wrapper.state().menuIndex).toEqual([0]);

    // press right arrow
    item = wrapper.find('MenuItem').at(0).find('.cui-list-item');
    item.simulate('keyDown', { which: 39 });
    expect(selectedIndex).toEqual([0]);
    expect(wrapper.state().menuIndex).toEqual([0, 0]);
    const subMenuItem = wrapper.find('MenuItem').at(0).find('.cui-event-overlay__children .cui-list-item');

    // press left arrow
    subMenuItem.simulate('keyDown', { which: 37 });
    expect(wrapper.state().menuIndex).toEqual([0]);
  });

  it('when children are not MenuItem should throw error', () => {
    try {
      mount(
        <Menu>
          <div>one</div>
        </Menu>
      );
    } catch(e) {
      expect(e.message).toEqual('children of Menu/MenuItem should be of type MenuItem');
    }
    try {
      mount(
        <Menu>
          <MenuItem>one</MenuItem>
        </Menu>
      );
    } catch(e) {
      expect(e.message).toEqual('children of Menu/MenuItem should be of type MenuItem');
    }
  });

});
