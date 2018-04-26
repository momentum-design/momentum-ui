import React from 'react';
import { shallow } from 'enzyme';
import CloseIcon from '../CloseIcon';

describe('tests for <CloseIcon />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<CloseIcon className='test' />);

    expect(container).toMatchSnapshot();
  });

  it('should call onClick on click of close', () => {
    const onClick = jest.fn();
    const container = shallow(<CloseIcon className='test' onClick={onClick} />);
    expect(container.find('.test').length).toEqual(1);
    expect(container.find('.test').props()['aria-label']).toEqual('Close');

    container.find('.cui-close').simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

});
