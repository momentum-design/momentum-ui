import React from 'react';
import { shallow, mount } from 'enzyme';
import MenuItem from '@collab-ui/react/MenuItem';

describe('tests for <MenuItem />', () => {
  it('should render a MenuItem', () => {
    const wrapper = shallow(
      <MenuItem label="one"/>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('when MenuItem is open it should display the subMenu', () => {
    const wrapper = shallow(
      <MenuItem label="one" isOpen>
        <MenuItem label="two"/>
      </MenuItem>
    );
    expect(wrapper.props()['aria-expanded']).toEqual(true);
    expect(wrapper.props()['aria-haspopup']).toEqual(true);
    expect(wrapper.props().children[0].props.active).toEqual(true);

    expect(wrapper.props().children[1].props.isOpen).toEqual(true);
    expect(wrapper.props().children[1].props.direction).toEqual("right-top");
    expect(wrapper.props().children[1].props.closeOnClick).toEqual(false);
    expect(wrapper.find('Icon').exists()).toEqual(true);

  });

  it('when MenuItem is not open it should not display the subMenu', () => {
    const wrapper = shallow(
      <MenuItem label="one">
        <MenuItem label="two"/>
      </MenuItem>
    );
    expect(wrapper.props()['aria-expanded']).toEqual(false);
    expect(wrapper.props()['aria-haspopup']).toEqual(true);
    expect(wrapper.props().children[0].props.active).toEqual(false);
    expect(wrapper.props().children[1]).toEqual(false);
  });

  it('should display the selectedValue of the menu if selectedValue prop is set', () => {
    const wrapper = mount(
      <MenuItem selectedValue="SubMenu" label="one">
        <MenuItem label="two"/>
      </MenuItem>
    );
    expect(wrapper.find('.cui-menu-item__selected-value').at(0).text()).toEqual("SubMenu");
  });

  it('should display the contents in the content prop when provided', () => {
    const wrapper = mount(
      <MenuItem selectedValue="SubMenu" label="one" content={<div>test</div>}>
        <MenuItem label="two"/>
      </MenuItem>
    );
    expect(wrapper.find('.cui-menu-item__content').at(0).text()).toEqual("test");
    expect(wrapper.find('.cui-menu-item__content').at(0).text()).toEqual("test");
  });

  it('should call handleClick function of context when ListItem is clicked', () => {
    const onClick = jest.fn();
    const contextHandleClick = jest.fn();
    const wrapper = mount(
      <MenuItem onClick={onClick} label="one"/>,
        { context: { handleClick: contextHandleClick } }
    );
    const listItem = wrapper.find('.cui-list-item');
    listItem.simulate('click');
    expect(contextHandleClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalled();
  });

  it('should set ariaLabel of subMenu', () => {
    const wrapper = mount(
      <MenuItem label="one" isOpen>
        <MenuItem label="two"/>
      </MenuItem>
    );
    expect(wrapper.find('.cui-event-overlay__children').props().children.props['aria-label']).toEqual("one");
  });

  it('should call handleKeyDown function of context when keyDown is fired on ListItem', () => {
    const onKeyDown = jest.fn();
    const wrapper = mount(
      <MenuItem label="one"/>,
        { context: { handleKeyDown: onKeyDown } }
    );
    const listItem = wrapper.find('.cui-list-item');
    listItem.simulate('keydown');
    expect(onKeyDown).toHaveBeenCalled();
  });

  describe('tests for title Prop', () => {
    it('should not have title by default', () => {
      const container = mount(
        <MenuItem />
      );

      expect(container.find('.cui-list-item').props().title).toEqual(undefined);
    });

    it('should handle title prop', () => {
      const container = mount(
        <MenuItem title='testTitle'/>
      );

      expect(container.find('.cui-list-item').props().title).toEqual('testTitle');
    });
  });
});
