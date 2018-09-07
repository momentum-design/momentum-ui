
import React from 'react';
import { shallow, mount } from 'enzyme';
import { SpaceListMeeting } from '@collab-ui/react';

describe('tests for <SpaceListMeeting />', () => {
  beforeAll(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  it('should match SnapShot', () => {
    const container = shallow(<SpaceListMeeting header='header'/>);

    expect(container).toMatchSnapshot();
  });

  it('should render childrenLeft', () => {
    const container = mount(
      <SpaceListMeeting header='header' childrenLeft={<div className='test'>Test</div>}/>
    );

    expect(container.find('.test').length).toEqual(1);
  });

  it('should render childrenRight', () => {
    const container = mount(
      <SpaceListMeeting header='header' childrenRight={<div className='test'>Test</div>}/>
    );

    expect(container.find('.test').length).toEqual(1);
  });

  it('should render attendees prop', () => {
    
    const container = mount(
      <SpaceListMeeting 
        header='header'   
        attendees={[
          {title: 'Joe Bojangles'},
          {title: 'Joe Boe'},
          {title: 'Joe Coe'},
          {title: 'Joe Doe'}
        ]}
      />
    );

    expect(container.find('.cui-event-overlay__children').children().find('.cui-list').children().length).toEqual(0);

    container.find('.cui-list-item--space-meeting--attendees').simulate('mouseenter');
    jest.runAllTimers();
    container.update();
    expect(container.find('.cui-event-overlay__children').children().find('.cui-list').children().length).toEqual(4);
  });

  it('should render attendees prop(node property)', () => {
    const container = mount(
      <SpaceListMeeting 
        header='header'   
        attendees={[
          {title: 'Joe Bojangles', node: <div className='internalNode' />},
        ]}
      />
    );

    expect(container.find('.cui-event-overlay__children').children().find('.internalNode').length).toEqual(0);

    container.find('.cui-list-item--space-meeting--attendees').simulate('mouseenter');
    jest.runAllTimers();
    container.update();
    expect(container.find('.cui-event-overlay__children').children().find('.internalNode').length).toEqual(1);
  });

  it('should render one SpaceListMeeting', () => {
    const container = mount(<SpaceListMeeting header='header' />);

    expect(container.find('.cui-list-item--space').exists()).toEqual(true);
  });

  it('should handle buttonLabel prop', () => {
    const container = mount(<SpaceListMeeting buttonLabel='Label' header='header'/>);

    expect(container.find('.cui-button').text()).toEqual('Label');
  });

  it('should handle buttonOnClick prop', () => {
    const onClick = jest.fn();
    const onClickParent = jest.fn();
    const container = mount(
      <SpaceListMeeting
        buttonLabel='Label'
        onClick={onClickParent}
        buttonOnClick={onClick}
        header='header'
      />
    );
    
    container.find('.cui-button').simulate('click');
    expect(onClick).toHaveBeenCalled();
    expect(onClickParent).not.toHaveBeenCalled();
  });
  
  it('should handle buttonOnClick and execute keyPress', () => {
    const onClick = jest.fn();
    const onClickParent = jest.fn();
    const container = mount(
      <SpaceListMeeting
        buttonLabel='Label'
        onClick={onClickParent}
        buttonOnClick={onClick}
        header='header'
      />
    );
    
    container
      .find('.cui-button')
      .simulate('keyDown', { which: 13, charCode: 13, key: 'Space' });
    expect(onClick).toHaveBeenCalled();
    expect(onClickParent).not.toHaveBeenCalled();
  });

  it('should handle className prop', () => {
    const container = mount(<SpaceListMeeting className='menuItem' header='header'/>);

    expect(container.find('.cui-list-item--space').hasClass('menuItem')).toEqual(true);
  });

  it('should handle header prop', () => {
    const container = mount(<SpaceListMeeting header='header'/>);

    expect(container.find('.cui-list-item__header').text()).toEqual('header');
  });

  it('should handle isBold prop', () => {
    const container = mount(<SpaceListMeeting header='header' isBold />);

    expect(container.find('.cui-list-item--unread').exists()).toEqual(true);
  });

  it('should handle subheader prop', () => {
    const container = mount(<SpaceListMeeting subheader='subheader' header='header'/>);

    expect(container.find('.cui-list-item__subheader').text()).toEqual('subheader');
  });

  describe('should handle meetingType', () => {
    it('should handle number', () => {
      const container = mount(<SpaceListMeeting meetingType='number' header='header'/>);

      expect(container.find('.cui-avatar__letter').text()).toEqual('#');
    });

    it('should handle group', () => {
      const container = mount(<SpaceListMeeting meetingType='group' header='header'/>);

      expect(container.find('.cui-avatar').hasClass('cui-avatar--group')).toEqual(true);
    });

    it('should handle device', () => {
      const container = mount(<SpaceListMeeting meetingType='device' header='header'/>);

      expect(container.find('.cui-avatar__icon').length).toEqual(1);
    });
  });

  it('should pass props to ListItem', () => {
    const customAnchorNode = <div className='custom-class' />;
    const container = mount(<SpaceListMeeting customAnchorNode={customAnchorNode} header='header'/>);

    expect(container.find('.custom-class').length).toEqual(1);
  });

  describe('tests for title Prop', () => {
    it('should not have title by default if header is node', () => {
      const container = mount(
        <SpaceListMeeting header={<div>test</div>} />        
      );
  
      expect(container.find('.cui-list-item').props().title).toEqual(undefined);
    });

    it('should handle title prop', () => {
      const container = mount(
        <SpaceListMeeting header='header' title='testTitle'/>        
      );
  
      expect(container.find('.cui-list-item').props().title).toEqual('testTitle');
    });

    it('should handle title if header is string', () => {
      const container = mount(
        <SpaceListMeeting header='testTitle'/>        
      );
  
      expect(container.find('.cui-list-item').props().title).toEqual('testTitle');
    });
  });
});

