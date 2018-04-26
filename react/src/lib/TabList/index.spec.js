import React from 'react';
import { shallow, mount } from 'enzyme';
import TabList from '../TabList';
import Tab from '../Tab';

describe('tests for <TabList />', () => {
  it('should match SnapShot', () => {
    const context = { focus: 0, onFocus: () => {}, onActivate: () => {} };
    const container = shallow(<TabList id="test"><Tab heading="one"/></TabList>, { context });

    expect(container).toMatchSnapshot();
  });

  it('should render children', () => {
    const context = { focus: 0, onFocus: () => {}, onActivate: () => {} };
    const container = mount(
      <TabList>
        <Tab heading="one"/>
      </TabList>, { context }
    );

    expect(container.find('.cui-tab__item').length).toEqual(1);
  });
});
