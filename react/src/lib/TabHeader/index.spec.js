import React from 'react';
import { shallow } from 'enzyme';
import TabHeader from '../TabHeader';

describe('tests for <TabHeader />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<TabHeader heading="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one TabHeader', () => {
    const container = shallow(<TabHeader heading="test" />);

    expect(container.find('cui-tab-heading').length).toEqual(1);
  });

  it('should render subheading', () => {
    const container = shallow(
      <TabHeader heading="test" subHeading="subtest" />
    );

    expect(container.find('div').text()).toEqual('subtest');
  });
});
