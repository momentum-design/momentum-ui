import React from 'react';
import { shallow } from 'enzyme';
import Badge from '../Badge';

describe('tests for <Badge />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Badge />);

    expect(container).toMatchSnapshot();
  });

  it('should render one Span', () => {
    const container = shallow(<Badge />);

    expect(container.find('span').length).toEqual(1);
  });

  it('should render one Child Div', () => {
    const container = shallow(
      <Badge>
        <div>Test</div>
      </Badge>
    );

    expect(container.find('span').children().length).toEqual(1);
  });

  it('should assign conditional rounded class name', () => {
    const container = shallow(<Badge rounded />);

    expect(container.find('span').hasClass('cui-badge--round')).toEqual(true);
  });

  it('should not assign conditional rounded class name', () => {
    const container = shallow(<Badge />);

    expect(container.find('span').hasClass('cui-badge--round')).toEqual(false);
  });

  it('should assign conditional color class name', () => {
    const container = shallow(<Badge color="blue" />);

    expect(container.find('span').hasClass('cui-badge--blue')).toEqual(true);
  });

  it('should not assign conditional color class name', () => {
    const container = shallow(<Badge />);

    expect(container.find('span').hasClass('cui-badge--blue')).toEqual(false);
  });

});
