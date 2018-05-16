import React from 'react';
import { shallow, mount } from 'enzyme';
import Menu from '../Menu';
import MenuItem from '../MenuItem';

describe('tests for <Menu />', () => {
  it('should render a Menu', () => {
    const wrapper = shallow(
      <Menu>
        <MenuItem>one</MenuItem>
      </Menu>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should focus first non disabled/ non readOnly menuItem', () => {
    const wrapper = shallow(
      <Menu>
        <MenuItem isHeader>one</MenuItem>
        <MenuItem disabled>two</MenuItem>
        <MenuItem>three</MenuItem>
      </Menu>
    );
    expect(wrapper.state().menuIndex).toEqual([2]);
    expect(wrapper.props().children[2].props.focus).toEqual(true);
  });

  it('should open/select the submenu', () => {
    const subMenu = [<MenuItem key="0">one-one</MenuItem>];
    let selectedIndex;
    const onSelect = (e, i) => selectedIndex = i;
    const wrapper = mount(
      <Menu onSelect={onSelect}>
        <MenuItem subMenu={subMenu}>one</MenuItem>
        <MenuItem>two</MenuItem>
        <MenuItem>three</MenuItem>
      </Menu>
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
    const subMenu = [<MenuItem key="0">one-one</MenuItem>];
    const wrapper = mount(
      <Menu onSelect={onSelect}>
        <MenuItem subMenu={subMenu}>one</MenuItem>
        <MenuItem>two</MenuItem>
        <MenuItem>three</MenuItem>
      </Menu>
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
      expect(e.message).toEqual('child elements and subMenu items should be MenuItem');
    }
    try {
      mount(
        <Menu>
          <MenuItem subMenu={[<div key="0">one-one</div>]}>one</MenuItem>
        </Menu>
      );
    } catch(e) {
      expect(e.message).toEqual('child elements and subMenu items should be MenuItem');
    }
  });

});
