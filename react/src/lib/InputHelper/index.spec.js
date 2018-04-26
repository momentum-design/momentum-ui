import React from 'react';
import { shallow } from 'enzyme';
import InputHelper from '../InputHelper';

describe('tests for <InputHelper />', () => {
  it('should match text SnapShot', () => {
    const container = shallow(<InputHelper message="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render input help with correct class', () => {
    const container = shallow(<InputHelper message="test" />);

    expect(container.find('p').hasClass('cui-input__help-text')).toEqual(true);
  });

  it('should render message', () => {
    const container = shallow(<InputHelper message="test" />);

    expect(container.find('p').text()).toEqual('test');
  });
});
