import React from 'react';
import { shallow } from 'enzyme';
import MenuContent from '@collab-ui/react/MenuContent';


describe('tests for <MenuContent />', () => {
  it('should render a MenuContent', () => {
    const wrapper = shallow(
      <MenuContent>test</MenuContent>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should apply className to MenuContent', () => {
    const wrapper = shallow(
      <MenuContent className="test">test</MenuContent>
    );
    expect(wrapper.find('.cui-menu-content').hasClass('test')).toEqual(true);
  });

});
