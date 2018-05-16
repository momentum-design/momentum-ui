import React from 'react';
import { shallow, mount } from 'enzyme';
import ListItemHeader from '@collab-ui/react/ListItemHeader';

describe('tests for <ListItemHeader />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ListItemHeader header='header'/>);

    expect(container).toMatchSnapshot();
  });

  it('should render childrenLeft', () => {
    const container = mount(
      <ListItemHeader header='header' children={<div className="test">Test</div>}/>
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
});

