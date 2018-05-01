import React from 'react';
import { shallow } from 'enzyme';
import SideNav from '@collab-ui/react/SideNav';

describe('<SideNav />', () => {
  it('should render a SideNav', () => {
    const wrapper = shallow(<SideNav navSectionTitle='Overview' />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallow(<SideNav className='testClassName' avSectionTitle='Overview' />);

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = shallow(
      <SideNav avSectionTitle='Overview'>
        <div className='dummy-children'>Dummy Children</div>
      </SideNav>
    );

    expect(wrapper.find('.dummy-children').exists()).toBeTruthy();
  });

  it('should render top level menu if top prop is set', () => {
    const wrapper = shallow(<SideNav navSectionTitle='Overview' topMenu />);

    expect(wrapper.find('.cui-side-nav__title--top').exists()).toBeTruthy();
  });

  it('should hide submenu if the expandable and expanded are set', () => {
    const wrapper = shallow(<SideNav navSectionTitle='Overview' expandable expanded={false} />);

    expect(wrapper.find('.cui-side-nav--collapse').exists()).toBeTruthy();
  });

  it('should show submenu if the expandable and expanded are set', () => {
    const wrapper = shallow(<SideNav navSectionTitle='Overview' expandable expanded />);

    expect(wrapper.find('.cui-side-nav--expanded').exists()).toBeTruthy();
  });

  it('should toggle submenu if expanded title is clicked', () => {
    const wrapper = shallow(<SideNav navSectionTitle='Overview' expandable expanded />);

    expect(wrapper.state().expanded).toBeTruthy();
    wrapper.find('button').simulate('click');
    expect(wrapper.state().expanded).toBeFalsy();
  });

  it('should not change state if the navigation is not expandable', () => {
    const wrapper = shallow(<SideNav navSectionTitle='Overview' />);

    expect(wrapper.state().expanded).toBeFalsy();
    wrapper.find('button').simulate('click');
    expect(wrapper.state().expanded).toBeFalsy();
  });
});
