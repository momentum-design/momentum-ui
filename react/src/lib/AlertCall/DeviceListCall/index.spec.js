import React from 'react';
import { shallow, mount } from 'enzyme';
import DeviceListCall from '../DeviceListCall';

describe('tests for <DeviceListCall />', () => {
  const header = 'Device selection';
  const devices = [
    {name: 'SJC21-Babelfish', value: '1010101', type: 'device', title:'testTitle'},
    {name: 'Use my computer', value: '2020202'}
  ];

  it('should match SnapShot', () => {
    const container = shallow(<DeviceListCall header={header} devices={devices}/>);

    expect(container).toMatchSnapshot();
  });

  it('should render one device list', () => {
    const container = mount(<DeviceListCall header={header} devices={devices}/>);

    expect(container.find('.cui-list').length).toEqual(1);
  });

  it('should handle className prop', () => {
    const container = mount(<DeviceListCall className='menuItem' header={header} devices={devices}/>);

    expect(container.find('.cui-list').hasClass('menuItem')).toEqual(true);
  });

  it('should handle header prop', () => {
    const container = mount(<DeviceListCall header='custom header text' devices={devices}/>);

    expect(container.find('.cui-list-item.cui-list-item-header').text()).toEqual('custom header text');
  });

  it('should handle onSelect event', () => {
    const onSelect = jest.fn();

    const container = mount(<DeviceListCall header={header} devices={devices} onSelect={onSelect}/>);

    container.find('.cui-list-item').last().simulate('click');
    expect(onSelect).toHaveBeenCalled();
  });

  describe('tests for device title prop', () => {
    it('should handle device title prop', () => {
      const container = mount(
        <DeviceListCall header={header} devices={devices} />     
      );
  
      expect(container.find('.cui-list-item').at(1).props().title).toEqual('testTitle');
    });

    it('should handle replace title with name', () => {
      const container = mount(
        <DeviceListCall header={header} devices={devices} /> 
      );

      expect(container.find('.cui-list-item').at(2).props().title).toEqual('Use my computer');
    });
  });

});
