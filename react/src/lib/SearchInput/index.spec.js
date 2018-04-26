import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchInput from '../SearchInput';

describe('tests for <SearchInput />', () => {
  it('should match normal SnapShot', () => {
    const container = shallow(
      <SearchInput htmlId="1" name="test" />
    );

    expect(container).toMatchSnapshot();
  });

  it('should match pill SnapShot', () => {
    const container = shallow(
      <SearchInput htmlId="1" name="test" type='pill' />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render Icon component', () => {
    const container = mount(
      <SearchInput htmlId="1" name="test" type='pill' />
    );
    expect(container.find('.cui-icon').length).toEqual(1);
  });
  
  it('should render one Input', () => {
    const container = mount(<SearchInput htmlId="1" name="test" />);
    
    expect(container.find('input').length).toEqual(1);
    expect(container.children().length).toEqual(1);
  });

  it('should pass disabled attribute', () => {
    const container = mount(
      <SearchInput htmlId="test123" name="test" disabled />
    );

    expect(container.find('input').props().disabled).toEqual(true);
  });

  it('should pass readOnly attribute', () => {
    const container = mount(
      <SearchInput htmlId="test123" name="test" readOnly />
    );

    expect(container.find('input').props().readOnly).toEqual(true);
  });

  it('should pass value attribute', () => {
    const handleChange = jest.fn();
    const container = mount(
      <SearchInput htmlId="test123" name="test" value="testing" onChange={handleChange}/>
    );

    expect(container.find('input').props().value).toEqual('testing');
  });

});
