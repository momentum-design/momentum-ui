import React from 'react';
import { shallow } from 'enzyme';
import TopbarMobile from '../TopbarMobile';

describe('tests for <TopbarMobile />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<TopbarMobile id="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one TopbarMobile', () => {
    const container = shallow(<TopbarMobile />);

    expect(container.at(0).find('.cui-top-bar__mobile').length).toEqual(1);
  });

  it('should render children', () => {
    const container = shallow(
      <TopbarMobile>
        <div className="testingforTbM" />
      </TopbarMobile>
    );

    expect(
      container
        .at(0)
        .find('.cui-tb-mobile__nav')
        .props().children.props.className
    ).toEqual('testingforTbM');
  });
});
