import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from '../ErrorBoundary';

describe('tests for <ErrorBoundary />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ErrorBoundary />);

    expect(container).toMatchSnapshot();
  });

  it('should render one ErrorBoundary', () => {
    const container = shallow(<ErrorBoundary />);

    expect(container.html()).toEqual(null);
  });

  it('should render children', () => {
    const container = shallow(
      <ErrorBoundary>
        <div className="testingforTC" />
      </ErrorBoundary>
    );

    expect(container.find('.testingforTC').length).toEqual(1);
  });
});
