import React from 'react';
import { shallow } from 'enzyme';
import TopbarRight from '../TopbarRight';

describe('tests for <TopbarRight />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<TopbarRight id="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one TopbarRight', () => {
    const container = shallow(<TopbarRight />);

    expect(container.find('.cui-top-bar__right').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <TopbarRight>
        <div className="testingforTbR" />
      </TopbarRight>
    );

    expect(container.find('.testingforTbR').length).toEqual(1);
  });
});
