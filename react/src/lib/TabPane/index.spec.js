import React from 'react';
import { shallow } from 'enzyme';
import TabPane from '../TabPane';

describe('tests for <TabPane />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<TabPane />);

    expect(container).toMatchSnapshot();
  });

  it('should render one TabPane', () => {
    const container = shallow(<TabPane />);

    expect(container.find('.cui-tab__pane').length).toEqual(1);
  });

  it('should render inactive by default', () => {
    const container = shallow(<TabPane />);

    expect(container.find('.cui-tab__pane').hasClass('active')).toEqual(false);
  });

  it('should render active when passed', () => {
    const container = shallow(<TabPane active />);

    expect(container.find('.cui-tab__pane').hasClass('active')).toEqual(true);
  });

  it('should render children', () => {
    const container = shallow(
      <TabPane>
        <div className="testingforTP" />
      </TabPane>
    );

    expect(container.find('.testingforTP').length).toEqual(1);
  });
});
