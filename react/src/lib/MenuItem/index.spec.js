import React from 'react';
import { shallow, mount } from 'enzyme';
import MenuItem from '../MenuItem';

describe('tests for <MenuItem />', () => {
  it('should render a MenuItem', () => {
    const wrapper = shallow(
      <MenuItem>one</MenuItem>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('when MenuItem is open it should display the subMenu', () => {
    const wrapper = shallow(
      <MenuItem subMenu={[<span key="0">SubMenu</span>]} isOpen>one</MenuItem>
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
      <MenuItem subMenu={[<span key="0">SubMenu</span>]}>one</MenuItem>
    );
    expect(wrapper.props()['aria-expanded']).toEqual(false);
    expect(wrapper.props()['aria-haspopup']).toEqual(true);
    expect(wrapper.props().children[0].props.active).toEqual(false);
    expect(wrapper.props().children[1]).toEqual(null);
  });

  it('should display the selectedValue of the menu if selectedValue prop is set', () => {
    const wrapper = mount(
      <MenuItem selectedValue="SubMenu" subMenu={[<span key="0">SubMenu</span>]}>one</MenuItem>
    );
    expect(wrapper.find('.cui-menu-item__selected-value').text()).toEqual("SubMenu");
  });

  it('should call handleClick function of context when ListItem is clicked', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <MenuItem onClick={onClick} subMenu={[<span key="0">SubMenu</span>]}>one</MenuItem>,
        { context: { handleClick: onClick } }
    );
    const listItem = wrapper.find('.cui-list-item');
    listItem.simulate('click');
    expect(onClick).toHaveBeenCalled();

  });

  it('should call handleKeyDown function of context when keyDown is fired on ListItem', () => {
    const onKeyDown = jest.fn();
    const wrapper = mount(
      <MenuItem onKeyDown={onKeyDown} subMenu={[<span key="0">SubMenu</span>]}>one</MenuItem>,
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
  })
});
