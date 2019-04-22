import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  Sidebar,
  SidebarNav,
  SidebarNavItem,
} from '@momentum-ui/react';

describe('<Sidebar />', () => {
  it('should render a Sidebar', () => {
    const wrapper = shallow(<Sidebar />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallow(<Sidebar className='testClassName'/>);

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = shallow(
      <Sidebar>
        <div className='dummy-children'>Dummy Children</div>
      </Sidebar>
    );

    expect(wrapper.find('.dummy-children').exists()).toBeTruthy();
  });

  it('should add customized theme name if theme prop is set', () => {
    const wrapper = shallow(<Sidebar theme='dark'/>);

    expect(wrapper.find('.md-sidebar--dark').exists()).toBeTruthy();
  });

  it('should hide Sidebar if the expandable and expanded are set', () => {
    const wrapper = shallow(<Sidebar expandable expanded={false} />);

    expect(wrapper.find('.md-sidebar--collapsed').exists()).toBeTruthy();
  });

  it('should show Sidebar if the expandable and expanded are set', () => {
    const wrapper = shallow(<Sidebar expandable expanded />);

    expect(wrapper.find('.md-sidebar--expanded').exists()).toBeTruthy();
  });

  it('should add fixed if isFixed prop is set', () => {
    const wrapper = shallow(<Sidebar isFixed/>);

    expect(wrapper.find('.md-sidebar--fixed').exists()).toBeTruthy();
  });

  it('should not add nested class if it has icons and no tiers in children', () => {
    const wrapper = shallow(<Sidebar isFixed/>);

    expect(wrapper.find('.md-sidebar--nested').exists()).toBeFalsy();
  });

  it('should add nested class if it has icons and secondary tiers in children', () => {
    const wrapper = shallow(<Sidebar isFixed/>);
    wrapper.setState({
      sidebarContext: {
        secondary: true
      }
    });

    expect(wrapper.find('.md-sidebar--nested').exists()).toBeTruthy();
  });

  it('should add nested class if it has icons and secondary tiers in children', () => {
    const wrapper = shallow(<Sidebar isFixed/>);
    wrapper.setState({
      sidebarContext: {
        tertiary: true
      }
    });

    expect(wrapper.find('.md-sidebar--nested').exists()).toBeTruthy();
  });

  it('should not have global class with isPageLevel true', () => {
    const wrapper = shallow(<Sidebar isPageLevel/>);

    expect(wrapper.find('.md-sidebar--global').exists()).toBeFalsy();
  });

  it('should add indented class if withIcons is true', () => {
    const wrapper = shallow(<Sidebar withIcons/>);

    expect(wrapper.find('.md-sidebar--indented').exists()).toBeTruthy();
  });

  it('should add indented class if withIcons=(true), isPageLevel=(true)', () => {
    const wrapper = shallow(<Sidebar withIcons isPageLevel/>);

    expect(wrapper.find('.md-sidebar--indented').exists()).toBeFalsy();
  });

  it('should add topbar class if withTopbar is true', () => {
    const wrapper = shallow(<Sidebar withTopbar/>);

    expect(wrapper.find('.md-sidebar--topbar').exists()).toBeTruthy();
  });

  it('should have nested class if nested SidebarItems', () => {
    const wrapper = mount(
      <Sidebar>
        <SidebarNav>
          <SidebarNavItem>
            <SidebarNavItem />
          </SidebarNavItem>
        </SidebarNav>
      </Sidebar>
    );

    expect(wrapper.find('.md-sidebar--nested').exists()).toBeTruthy();
  });
});
