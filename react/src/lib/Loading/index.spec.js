import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../Loading';

describe('tests for <Loading />', () => {
  it('should render a Loading', () => {
    const wrapper = shallow(<Loading />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render 3 span children', () => {
    const wrapper = shallow(<Loading />);

    expect(wrapper.find('span').length).toEqual(3);
  });
});
