import React from 'react';
import { shallow } from 'enzyme';
import TabContent from '../TabContent';

describe('tests for <TabContent />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<TabContent id="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one TabContent', () => {
    const container = shallow(<TabContent />);

    expect(container.find('.cui-tab__content').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <TabContent>
        <div className="testingforTC" />
      </TabContent>
    );

    expect(container.find('.testingforTC').length).toEqual(1);
  });
});
