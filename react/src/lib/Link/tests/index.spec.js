import React from 'react';
import { shallow } from 'enzyme';
import { Link } from '@collab-ui/react';

describe('tests for <Link />', () => {
  it('should match SnapShot', () => {
    const container = shallow(
      <Link>
        <div className='child' />
      </Link>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render className if prop is passed', () => {
    const container = shallow(
      <Link className='dark'>
        <div className='child' />
      </Link>
    );

    expect(container.find('.dark').exists()).toBeTruthy();
  });


  it('should render color if prop is passed', () => {
    const container = shallow(
      <Link color='green'>
        <div className='child' />
      </Link>
    );

    expect(container.find('.cui-link--green').exists()).toBeTruthy();
  });

  it('should render theme if prop is passed', () => {
    const container = shallow(
      <Link theme='dark'>
        <div className='child' />
      </Link>
    );

    expect(container.find('.cui-link--dark').exists()).toBeTruthy();
  });

  it('should render disabled if prop is passed', () => {
    const container = shallow(
      <Link disabled>
        <div className='child' />
      </Link>
    );

    expect(container.find('[disabled=true]').exists()).toBeTruthy();
  });


  it('should render children', () => {
    const container = shallow(
      <Link>
        <div className='child' />
      </Link>
    );

    expect(container.find('.child').exists()).toBeTruthy();
  });
});
