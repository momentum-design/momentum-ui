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

    expect(container.find('.cui-editable-textfield__button').length).toEqual(1);
    expect(container.find('Input').length).toEqual(0);
  });

  it('should click on Editable Textfield', () => {
    const container = shallow(<EditableTextfield inputText='Hello World' />);
    container.find('.cui-editable-textfield__button').simulate('click');

    expect(container.find('.cui-editable-textfield__button').length).toEqual(0);
    expect(container.find('Input').length).toEqual(1);
  });

  it('should pass buttonClassName to button', () => {
    const container = shallow(<EditableTextfield buttonClassName='buttonClass' className='inputClass' />);

    expect(container.find('.inputClass').exists()).toEqual(false);
    expect(container.find('.buttonClass').exists()).toEqual(true);
  });

  it('should pass className to Input', () => {
    const container = shallow(<EditableTextfield buttonClassName='buttonClass' className='inputClass' />);
    container.find('.cui-editable-textfield__button').simulate('click');

    expect(container.find('.buttonClass').exists()).toEqual(false);
    expect(container.find('.inputClass').exists()).toEqual(true);
  });

  it('should pass props to Input', () => {
    const container = shallow(<EditableTextfield title='testProp' />);
    container.find('.cui-editable-textfield__button').simulate('click');

    expect(container.find('Input').props().title).toEqual('testProp');
  });

  it('should pass buttonProps to button', () => {
    const container = shallow(<EditableTextfield buttonProps={{ title: 'testProp' }} />);

    expect(container.find('.cui-editable-textfield__button').props().title).toEqual('testProp');
  });

  it('should pass alignment prop to container', () => {
    const container = shallow(<EditableTextfield alignment='center' />);

    expect(container.find('.cui-editable-textfield--center').exists()).toEqual(true);
  });

  it('should click on Editable Textfield, edit and save', () => {
    const container = mount(<EditableTextfield inputText={'Hello World'}/>);
    container.find('.cui-editable-textfield__button').simulate('click');

    container.find('.cui-input').simulate('change', { target: { value: "Hello World Tom" } });
    container.find('.cui-input').simulate('keydown', { 
      keyCode: 13,
      key: 'Enter',
      nativeEvent: { stopImmediatePropagation: ()=>{} }, 
    });

    expect(container.find('.cui-editable-textfield__button').text()).toEqual('Hello World Tom');
    expect(container.find('.cui-editable-textfield__button').length).toEqual(1);
    expect(container.find('Input').length).toEqual(0);
  });

  it('should click on Editable Textfield, edit and exit(escape)', () => {
    const container = mount(<EditableTextfield inputText={'Hello World'}/>);
    container.find('.cui-editable-textfield__button').simulate('click');

    container.find('.cui-input').simulate('change', { target: { value: "Hello World Tom" } });
    container.find('.cui-input').simulate('keydown', { 
      keyCode: 27, 
      key: 'Escape',
      nativeEvent: { stopImmediatePropagation: ()=>{} }, 
    });

    expect(container.find('.cui-editable-textfield__button').text()).toEqual('Hello World');
    expect(container.find('.cui-editable-textfield__button').length).toEqual(1);
    expect(container.find('Input').length).toEqual(0);
  });

  it('should click on Editable Textfield, edit and blur', () => {
    const container = mount(<EditableTextfield inputText={'Hello World'}/>);
    container.find('.cui-editable-textfield__button').simulate('click');

    container.find('.cui-input').simulate('change', { target: { value: "Hello World Tom" } });
    container.find('.cui-input').simulate('blur');

    expect(container.find('.cui-editable-textfield__button').text()).toEqual('Hello World Tom');
    expect(container.find('.cui-editable-textfield__button').length).toEqual(1);
    expect(container.find('Input').length).toEqual(0);
  });

  it('should handle empty value', () => {
    const container = mount(<EditableTextfield inputText={'Hello World'}/>);
    container.find('.cui-editable-textfield__button').simulate('click');

    container.find('.cui-input').simulate('change', { target: { value: "" } });
    container.find('.cui-input').simulate('blur');

    expect(container.find('.cui-editable-textfield__button').text()).toEqual('\u00a0');
    expect(container.find('.cui-editable-textfield__button').length).toEqual(1);
    expect(container.find('Input').length).toEqual(0);
  });

});
