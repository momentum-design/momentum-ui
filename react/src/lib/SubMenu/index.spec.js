import React from 'react';
import { shallow, mount } from 'enzyme';
import { MenuItem, SubMenu } from '@collab-ui/react';

describe('tests for <SubMenu />', () => {

  it('should render a SubMenu', () => {
    const wrapper = shallow(
      <SubMenu label="one">
        <MenuItem label="two"/>
      </SubMenu>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('when handle customNodeProp', () => {
    const wrapper = shallow(
      <SubMenu customNode={<div className='testNode'>one</div>} isOpen>
        <MenuItem label="two"/>
      </SubMenu>
    );

    expect(wrapper.find('.testNode').exists()).toEqual(true);
    expect(wrapper.find('.cui-menu-item__content').exists()).toEqual(false);
  });

  it('when SubMenu is open it should display the subMenu', () => {
    const wrapper = shallow(
      <SubMenu label="one" isOpen>
        <MenuItem label="two"/>
      </SubMenu>
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
      <SubMenu label="one">
        <MenuItem label="two"/>
      </SubMenu>
    );
    expect(wrapper.props()['aria-expanded']).toEqual(false);
    expect(wrapper.props()['aria-haspopup']).toEqual(true);
    expect(wrapper.props().children[0].props.active).toEqual(false);
    expect(wrapper.props().children[1]).toEqual(false);
  });

  it('should display the selectedValue of the menu if selectedValue prop is set', () => {
    const wrapper = mount(
      <SubMenu selectedValue="SubMenu" label="one">
        <MenuItem label="two"/>
      </SubMenu>
    );
    expect(wrapper.find('.cui-menu-item__selected-value').at(0).text()).toEqual("SubMenu");
  });

  it('should display the contents in the content prop when provided', () => {
    const wrapper = mount(
      <SubMenu selectedValue="SubMenu" label="one" content={<div>test</div>}>
        <MenuItem label="two"/>
      </SubMenu>
    );
    expect(wrapper.find('.cui-menu-item__content').at(0).text()).toEqual("test");
    expect(wrapper.find('.cui-menu-item__content').at(0).text()).toEqual("test");
  });

  it('when MenuItem is open it should display the subMenu', () => {
    const wrapper = shallow(
      <SubMenu label="one" isOpen>
        <MenuItem label="two"/>
      </SubMenu>
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
      <SubMenu label="one">
        <MenuItem label="two"/>
      </SubMenu>
    );
    expect(wrapper.props()['aria-expanded']).toEqual(false);
    expect(wrapper.props()['aria-haspopup']).toEqual(true);
    expect(wrapper.props().children[0].props.active).toEqual(false);
    expect(wrapper.props().children[1]).toEqual(false);
  });

  it('should display the selectedValue of the menu if selectedValue prop is set', () => {
    const wrapper = mount(
      <SubMenu selectedValue="SubMenu" label="one">
        <MenuItem label="two"/>
      </SubMenu>
    );
    expect(wrapper.find('.cui-menu-item__selected-value').at(0).text()).toEqual("SubMenu");
  });

  it('should display the contents in the content prop when provided', () => {
    const wrapper = mount(
      <SubMenu selectedValue="SubMenu" label="one" content={<div>test</div>}>
        <MenuItem label="two"/>
      </SubMenu>
    );
    expect(wrapper.find('.cui-menu-item__content').at(0).text()).toEqual("test");
    expect(wrapper.find('.cui-menu-item__content').at(0).text()).toEqual("test");
  });

  it('should set ariaLabel of subMenu', () => {
    const wrapper = mount(
      <SubMenu label="one" isOpen>
        <MenuItem label="two"/>
      </SubMenu>
    );
    expect(wrapper.find('.cui-event-overlay__children').props().children.props['aria-label']).toEqual("one");
  });
});
