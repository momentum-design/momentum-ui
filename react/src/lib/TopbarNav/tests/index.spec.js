import React from 'react';
import { shallow } from 'enzyme';
import TopbarNav from '../TopbarNav';

describe('tests for <TopbarNav />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<TopbarNav id="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one TopbarNav', () => {
    const container = shallow(<TopbarNav />);

    expect(container.find('.cui-top-bar__nav').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <TopbarNav>
        <div className="testingforTbN" />
      </TopbarNav>
    );

    expect(container.find('.testingforTbN').length).toEqual(1);
  });
});
