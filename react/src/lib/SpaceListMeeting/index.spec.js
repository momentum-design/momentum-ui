
import React from 'react';
import { shallow, mount } from 'enzyme';
import SpaceListMeeting from '@collab-ui/react/SpaceListMeeting';

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
      <SpaceListMeeting header='header' childrenLeft={<div className="test">Test</div>}/>
    );

    expect(container.find('.test').length).toEqual(1);
  });

  it('should render childrenRight', () => {
    const container = mount(
      <SpaceListMeeting header='header' childrenRight={<div className="test">Test</div>}/>
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

    container.find('.cui-list-item--space-meeting--attendees').simulate('click');
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

    container.find('.cui-list-item--space-meeting--attendees').simulate('click');
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

  it('should handle className prop', () => {
    const container = mount(<SpaceListMeeting className='menuItem' header='header'/>);

    expect(container.find('.cui-list-item--space').hasClass('menuItem')).toEqual(true);
  });

  it('should handle header prop', () => {
    const container = mount(<SpaceListMeeting header='header'/>);

    expect(container.find('.cui-list-item__header').text()).toEqual('header');
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
});

