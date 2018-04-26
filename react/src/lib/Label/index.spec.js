import React from 'react';
import { shallow } from 'enzyme';
import Label from '../Label';

describe('tests for <Label />', () => {
  it('should match text SnapShot', () => {
    const container = shallow(<Label htmlFor="test" label="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should have HTML for attribute', () => {
    const container = shallow(<Label htmlFor="test" label="testLabel" />);

    expect(container.find('label').props().htmlFor).toEqual('test');
  });

  it('should render label', () => {
    const container = shallow(<Label htmlFor="test" label="testLabel" />);

    expect(container.find('span').text()).toEqual('testLabel');
  });
});
