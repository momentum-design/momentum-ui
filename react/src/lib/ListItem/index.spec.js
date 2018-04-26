import React from 'react';
import { shallow, mount } from 'enzyme';
import ListItem from '../ListItem';

describe('tests for <ListItem />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ListItem />, { disableLifecycleMethods: true });

    expect(container).toMatchSnapshot();
  });

  it('should render one ListItem', () => {
    const container = mount(<ListItem />);

    expect(container.find('.cui-list-item').length).toEqual(1);
  });

  it('should handle className prop', () => {
    const container = mount(<ListItem className='menuItem'/>);

    expect(container.find('.cui-list-item').hasClass('menuItem')).toEqual(true);
  });

  it('should handle role prop', () => {
    const container = mount(<ListItem role='menuItem'/>);

    expect(container.find('.cui-list-item').props().role).toEqual('menuItem');
  });

  it('should handle type prop (small)', () => {
    const container = mount(<ListItem type='small'/>);

    expect(container.find('div').hasClass('cui-list-item--small')).toEqual(true);
  });
  
  it('should handle type prop (large)', () => {
    const container = mount(<ListItem type='large'/>);

    expect(container.find('div').hasClass('cui-list-item--large')).toEqual(true);
  }); 

  it('should render label', () => {
    const container = mount(<ListItem link='large' label='large'/>);

    expect(container.find('a').text()).toEqual('large');
  });  

  it('should handle link prop', () => {
    const container = mount(<ListItem link='left'/>);

    expect(container.find('a').length).toEqual(1);
  });

  it('should handle customAnchorNode prop', () => {
    const container = mount(<ListItem link='left' customAnchorNode={<div className='testAnchor' />}/>);

    expect(container.find('.testAnchor').length).toEqual(1);
  });

  it('should handle refName prop', () => {
    const container = mount(<ListItem link='left' refName='testAnchor'/>);

    expect(container.instance().testAnchor.tagName).toEqual('A');
  });

  it('should handle active prop', () => {
    const container = mount(<ListItem link='left' refName='testAnchor' active/>);

    expect(container.find('a').hasClass('active')).toEqual(true);
  });

  it('should handle disabled prop', () => {
    const container = mount(<ListItem link='left' refName='testAnchor' disabled/>);

    expect(container.find('a').hasClass('disabled')).toEqual(true);
  });

  it('should handle focus prop', () => {
    const container = mount(<ListItem link='left' refName='testAnchor' focus/>);

    expect(container.find('a').props().tabIndex).toEqual(0);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<ListItem label="test" link='test' onClick={countUp} />);

    container.find('a').simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle keyPress as onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<ListItem label="test" link='test' onKeyDown={countUp} />);

    container
      .find('a')
      .simulate('keydown', { keyCode: 13, which: 13, charCode: 13, key: 'Space' });

    expect(count).toEqual(1);
  });

  it('should render children', () => {
    const container = mount(
      <ListItem>
        <span className='testChildren'>Test</span>
      </ListItem>
    );

    expect(container.find('span').hasClass('testChildren')).toEqual(true);
  });

  it('should handle custom Ref prop', () => {
    const container = mount(
      <ListItem customRefProp='ref' customAnchorNode={<span>Test</span>} />        
    );

    expect(container.instance().navLink.tagName).toEqual('SPAN');
  });
});

