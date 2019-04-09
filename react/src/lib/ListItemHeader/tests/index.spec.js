import React from 'react';
import { shallow, mount } from 'enzyme';
import { List, ListItemHeader } from '@collab-ui/react';

describe('tests for <ListItemHeader />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ListItemHeader header='header'/>);

    expect(container).toMatchSnapshot();
  });

  it('should render children', () => {
    const container = mount(
      <ListItemHeader header='header' children={<div className='test'>Test</div>}/>
    );

    expect(container.find('.test').length).toEqual(1);
  });

  it('should render one ListItemHeader', () => {
    const container = mount(<ListItemHeader header='header' />);

    expect(container.find('.cui-list-item-header').exists()).toEqual(true);
  });

  it('should handle isReadOnly prop', () => {
    const container = mount(<ListItemHeader isReadOnly header='header'/>);

    expect(container.props().isReadOnly).toEqual(true);
  });

  it('should allow children to be clicked on', () => {
    const onClickFn = jest.fn();
    const clickableNode = <div className='testClick' role='button' onClick={onClickFn} onKeyDown={onClickFn} tabIndex={0}/>;
    const container = mount(
      <List>
        <ListItemHeader header='Testing'>
          {clickableNode}
        </ListItemHeader>
      </List>
    );

    container.find('.testClick').simulate('click');
    expect(onClickFn).toHaveBeenCalled();
  });

  it('should handle type prop', () => {
    const container = mount(<ListItemHeader type='space' header='header'/>);

    expect(container.find('.cui-list-item-header--space').exists()).toEqual(true);
  });

  it('should handle className prop', () => {
    const container = mount(<ListItemHeader className='menuItem' header='header'/>);

    expect(container.hasClass('menuItem')).toEqual(true);
  });

  it('should handle header prop', () => {
    const container = mount(<ListItemHeader header='header'/>);

    expect(container.find('.cui-list-item__header').text()).toEqual('header');
  });

  it('should pass props to ListItem', () => {
    const customAnchorNode = <div className='custom-class' />;
    const container = mount(<ListItemHeader customAnchorNode={customAnchorNode} header='header'/>);

    expect(container.find('.custom-class').length).toEqual(1);
  });

  describe('tests for title Prop', () => {
    it('should handle title prop', () => {
      const container = mount(
        <ListItemHeader header='header' title='testTitle'/>        
      );
  
      expect(container.find('.cui-list-item').props().title).toEqual('testTitle');
    });

    it('should handle title if header is string', () => {
      const container = mount(
        <ListItemHeader header='testTitle'/>        
      );
  
      expect(container.find('.cui-list-item').props().title).toEqual('testTitle');
    });
  });
});

