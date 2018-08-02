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

  it('should apply class for isHeader prop', () => {
    const container = mount(
      <MenuItem isHeader />
    );

    expect(container.find('.cui-menu-item__header').exists()).toEqual(true);
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
