import React from 'react';
import { shallow, mount } from 'enzyme';
import { EditableTextfield } from '@collab-ui/react';

describe('tests for <EditableTextfield />', () => {
  it('should render an Editable Textfield', () => {
    const wrapper = shallow(<EditableTextfield />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render one Editable Textfield', () => {
    const container = shallow(<EditableTextfield />);

    expect(container.find('span').length).toEqual(1);
    expect(container.find('input').length).toEqual(0);
  });

  it('should click on Editable Textfield', () => {
    const container = shallow(<EditableTextfield inputText='Hello World' />);
    container.find('span').simulate('click');

    expect(container.find('span').length).toEqual(0);
    expect(container.find('Input').length).toEqual(1);
  });

  it('should click on Editable Textfield, edit and save', () => {
    const container = mount(<EditableTextfield inputText={'Hello World'}/>);
    container.find('span').simulate('click');

    container.find('.cui-input').simulate('change', { target: { value: "Hello World Tom" } });
    container.find('.cui-input').simulate('keydown', { keyCode: 13, key: 'Enter' });

    expect(container.find('span').text()).toEqual('Hello World Tom');
    expect(container.find('span').length).toEqual(1);
    expect(container.find('Input').length).toEqual(0);
  });

  it('should click on Editable Textfield, edit and exit(escape)', () => {
    const container = mount(<EditableTextfield inputText={'Hello World'}/>);
    container.find('span').simulate('click');

    container.find('.cui-input').simulate('change', { target: { value: "Hello World Tom" } });
    container.find('.cui-input').simulate('keydown', { keyCode: 27, key: 'Escape' });

    expect(container.find('span').text()).toEqual('Hello World');
    expect(container.find('span').length).toEqual(1);
    expect(container.find('Input').length).toEqual(0);
  });

  it('should click on Editable Textfield, edit and blur', () => {
    const container = mount(<EditableTextfield inputText={'Hello World'}/>);
    container.find('span').simulate('click');

    container.find('.cui-input').simulate('change', { target: { value: "Hello World Tom" } });
    container.find('.cui-input').simulate('blur');

    expect(container.find('span').text()).toEqual('Hello World Tom');
    expect(container.find('span').length).toEqual(1);
    expect(container.find('Input').length).toEqual(0);
  });

});
