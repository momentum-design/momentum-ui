import React from 'react';
import { shallow, mount } from 'enzyme';
import { AlertCall, Avatar } from '@collab-ui/react';

describe('tests for <AlertCall />', () => {
  const alertTitle = 'Incoming call';
  const caller1 = {
    title: 'Jefe Guadelupe',
    alt: '+1 408-555-1212',
  };

  const caller2 = {
    title: '+1 972-555-1212',
    type: 'number'
  };

  const caller3 = {
    title: 'SJC21-Babelfish',
    alt: '+1 469-555-1212',
    type: 'device'
  };

  it('should match SnapShot', () => {
    const container = shallow(<AlertCall show caller={caller1} title={alertTitle}/>);

    expect(container).toMatchSnapshot();
  });

  it('should render one AlertCall', () => {
    const container = mount(<AlertCall show caller={caller1} title={alertTitle} />);

    expect(container.find('.cui-alert.cui-alert--call').length).toEqual(1);
  });

  it('should render meeting title', () => {
    const container = shallow(<AlertCall show caller={caller2} title={alertTitle} />);

    expect(container.find('.cui-alert__title').text()).toEqual('Incoming call');
  });

  it('should render an avatar', () => {
    const container = mount(<AlertCall show caller={caller2} title={alertTitle} />);

    expect(container.find(Avatar).length).toEqual(1);
  });

  it('should handle caller.title prop', () => {
    const container = shallow(<AlertCall show caller={caller1} title={alertTitle} />);

    expect(container.find('.cui-alert__caller-title').text()).toEqual('Jefe Guadelupe');
  });

  it('should handle caller.alt prop', () => {
    const container = shallow(<AlertCall show caller={caller1} title={alertTitle} />);

    expect(container.find('.cui-alert__caller-subtitle').text()).toEqual('+1 408-555-1212');
  });

  describe('should handle caller.type', () => {
    it('should handle number', () => {
      const container = mount(<AlertCall show caller={caller2} title={alertTitle}/>);

      expect(container.find('.cui-avatar__letter').text()).toEqual('#');
    });

    it('should handle device', () => {
      const container = mount(<AlertCall show caller={caller3} title={alertTitle}/>);

      expect(container.find('.cui-avatar__icon').length).toEqual(1);
    });
  });

  it('should render three action buttons when onAnswerVoice is passed in', () => {
    const container = mount(<AlertCall show caller={caller1} title={alertTitle} onAnswerVoice={() => {}} />);

    expect(container.find('.cui-button').length).toEqual(3);
  });

  it('should render two action buttons when onAnswerVoice is not passed in', () => {
    const container = mount(<AlertCall show caller={caller1} title={alertTitle} />);

    expect(container.find('.cui-button').length).toEqual(2);
  });

  it('should handle onReject event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<AlertCall show caller={caller1} title={alertTitle} onReject={countUp} />);

    container.find('.cui-button').last().simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle onAnswerVoice event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<AlertCall show caller={caller1} title={alertTitle} onAnswerVoice={countUp} />);

    container.find('.cui-button').at(1).simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle onAnswerVideo event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<AlertCall show caller={caller1} title={alertTitle} onAnswerVideo={countUp} />);

    container.find('.cui-button').first().simulate('click');
    expect(count).toEqual(1);
  });
});
