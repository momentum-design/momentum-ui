import React from 'react';
import { shallow } from 'enzyme';
import { Breadcrumbs } from '@momentum-ui/react';

describe('tests for <Breadcrumbs />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Breadcrumbs />);

    expect(container).toMatchSnapshot();
  });

  it('should render one UL', () => {
    const container = shallow(<Breadcrumbs />);

    expect(container.find('ul').length).toEqual(1);
  });

  it('should render one Child Div', () => {
    const container = shallow(
      <Breadcrumbs>
        <div>Test</div>
      </Breadcrumbs>
    );

    expect(container.find('ul').children().length).toEqual(1);
  });

  it('should assign conditional outlined class name', () => {
    const container = shallow(<Breadcrumbs className='testClass' />);

    expect(container.find('ul').hasClass('testClass')).toEqual(true);
  });
});
