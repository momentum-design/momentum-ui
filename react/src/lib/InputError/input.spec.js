import React from 'react';
import { shallow, mount } from 'enzyme';
import InputError from '../InputError';

describe('tests for <InputError />', () => {
  it('should match text SnapShot', () => {
    const container = shallow(<InputError error={'test'} />);

    expect(container).toMatchSnapshot();
  });

  it('should match render error with rendered text', () => {
    const container = mount(<InputError error={'test'} />);

    expect(container.find('.message').text()).toEqual('test');
  });
});
