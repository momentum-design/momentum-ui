import React from 'react';
import { shallow, mount } from 'enzyme';
import Select from '@collab-ui/react/Select';
import ListItem from '@collab-ui/react/ListItem';


describe('tests for <Select />', () => {
  it('should match normal SnapShot', () => {
    const container = shallow(
      <Select />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render children', () => {
    const container = shallow(
      <Select>
        <div className='child' />
      </Select>
    );
    container.setState({ isOpen: true });
    expect(container.find('.child').length).toEqual(1);
  });

  it('should handle className prop', () => {
    const container = mount(<Select className='testInput'/>);

    expect(container.find('button').hasClass('testInput')).toEqual(true);
  });

  it('should close on select (non-multi)', () => {
    const container = mount(
      <Select>
        <ListItem value='1'/>
        <ListItem value='2' className='clickMe'/>
        <ListItem value='3'/>
      </Select>
    );

    container.setState({ isOpen: true });
    expect(container.state().isOpen).toEqual(true);
    container.find('.clickMe').first().simulate('click');
    expect(container.state().selected).toEqual(['2']);
    expect(container.state().isOpen).toEqual(false);
  });

  it('should allow on multi-select', () => {
    const container = mount(
      <Select isMulti>
        <ListItem value='1' className='clickMe1'/>
        <ListItem value='2' className='clickMe2'/>
        <ListItem value='3'/>
      </Select>
    );

    expect(container.state().isOpen).toEqual(false);
    container.setState({ isOpen: true });
    expect(container.state().isOpen).toEqual(true);
    container.find('.clickMe1').first().simulate('click');
    expect(container.state().selected).toEqual(['1']);
    expect(container.state().isOpen).toEqual(true);
    container.find('.clickMe2').first().simulate('click');
    expect(container.state().selected).toEqual(['1','2']);
    expect(container.state().isOpen).toEqual(true);
  });

  it('should unselect after selecting on multi-select', () => {
    const container = mount(
      <Select isMulti>
        <ListItem value='1' className='clickMe1'/>
        <ListItem value='2' className='clickMe2'/>
        <ListItem value='3'/>
      </Select>
    );

    expect(container.state().isOpen).toEqual(false);
    container.setState({ isOpen: true });
    expect(container.state().isOpen).toEqual(true);
    container.find('.clickMe1').first().simulate('click');
    expect(container.state().selected).toEqual(['1']);
    expect(container.state().isOpen).toEqual(true);
    container.find('.clickMe1').first().simulate('click');
    expect(container.state().selected).toEqual([]);
    expect(container.state().isOpen).toEqual(true);
  });

  it('should pass defaultValue attribute', () => {
    const container = mount(
      <Select defaultValue='test' />
    );

    expect(container.find('.cui-select__label').text()).toEqual('test');
  });

  it('should continue updating input value on select', () => {
    const container = mount(
      <Select isMulti>
        <ListItem value='1' className='clickMe1'/>
        <ListItem value='2' className='clickMe2'/>
        <ListItem value='3'/>
      </Select>
    );

    expect(container.state().isOpen).toEqual(false);
    container.setState({ isOpen: true });
    expect(container.state().isOpen).toEqual(true);
    container.find('.clickMe1').first().simulate('click');
    expect(container.find('.cui-select__label').text()).toEqual('1 Item Selected');
    container.find('.clickMe2').first().simulate('click');
    expect(container.find('.cui-select__label').text()).toEqual('2 Items Selected');
  });

  it('should handle onSelect event', () => {
    const onSelect = jest.fn();

    const container = mount(
      <Select onSelect={onSelect}>
        <ListItem value='1' className='clickMe1'/>
        <ListItem value='2' className='clickMe2'/>
        <ListItem value='3'/>
      </Select>
    );

    expect(container.state().isOpen).toEqual(false);
    container.setState({ isOpen: true });
    expect(container.state().isOpen).toEqual(true);
    container.find('.clickMe1').first().simulate('click');
    expect(onSelect).toHaveBeenCalled();
  });

});
