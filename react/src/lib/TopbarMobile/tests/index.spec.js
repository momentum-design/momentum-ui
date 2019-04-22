import React from 'react';
import { shallow } from 'enzyme';
import { TopbarMobile } from '@momentum-ui/react';

describe('tests for <TopbarMobile />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<TopbarMobile id="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one TopbarMobile', () => {
    const container = shallow(<TopbarMobile />);

    expect(container.at(0).find('.md-top-bar__mobile').length).toEqual(1);
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
        .find('.md-tb-mobile__nav')
        .props().children.props.className
    ).toEqual('testingforTbM');
  });
});
