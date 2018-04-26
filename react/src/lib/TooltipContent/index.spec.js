import React from 'react';
import { shallow } from 'enzyme';
import TooltipContent from '../TooltipContent';

describe('tests for <TooltipContent />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<TooltipContent />);

    expect(container).toMatchSnapshot();
  });

  it('should render one null html with no children', () => {
    const container = shallow(<TooltipContent />);

    expect(container.html()).toEqual(null);
  });

  it('should render children', () => {
    const container = shallow(
      <TooltipContent>
        <div className="testingforTC" />
      </TooltipContent>
    );

    expect(container.find('.testingforTC').length).toEqual(1);
  });
});
