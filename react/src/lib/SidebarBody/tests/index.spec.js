import React from 'react';
import { shallow } from 'enzyme';
import SidebarBody from '@momentum-ui/react/SidebarBody';

describe('<SidebarBody />', () => {
  it('should render a SidebarBody', () => {
    const wrapper = shallow(<SidebarBody />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallow(<SidebarBody className='testClassName'/>);

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = shallow(
      <SidebarBody>
        <div className='sample-children'>Sample Children</div>
      </SidebarBody>
    );

    expect(wrapper.find('.sample-children').exists()).toBeTruthy();
  });
});
