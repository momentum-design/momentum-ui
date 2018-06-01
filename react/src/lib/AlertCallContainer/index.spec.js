import React from 'react';
import { shallow, mount } from 'enzyme';
import { AlertCall } from '@collab-ui/react';
import AlertCallContainer from '../AlertCallContainer';

describe('tests for <AlertCallContainer />', () => {
  const alertTitle = 'Incoming call';
  const caller1 = {
    title: 'Jefe Guadelupe',
    alt: '+1 408-555-1212',
  };

  const caller2 = {
    title: '+1 972-555-1212',
    type: 'number'
  };

  it('should match SnapShot', () => {
    const container = shallow(<AlertCallContainer/>);

    expect(container).toMatchSnapshot();
  });

  it('should render a div', () => {
    const container = shallow(<AlertCallContainer/>);

    expect(container.find('.cui-alert__container--call').length).toEqual(1);
  });

  it('should render an AlertCall when callAlert() is called', () => {
    const container = mount(<AlertCallContainer/>);
    container.instance().callAlert(
      alertTitle,
      caller1,
      'foo bar',
      undefined,
      () => {},
      () => {},
      () => {},
      () => {}
    );
    container.update();
    expect(container.find(AlertCall).length).toEqual(1);
  });

  it('should render no more than two call alerts at the same time', () => {
    const container = mount(<AlertCallContainer/>);
    container.instance().callAlert(
      alertTitle,
      caller1,
      'foo bar',
      undefined,
      () => {},
      () => {},
      () => {},
      () => {}
    );

    container.instance().callAlert(
      alertTitle,
      caller2,
      'foo bar',
      undefined,
      () => {},
      () => {},
      () => {},
      () => {}
    );

    container.instance().callAlert(
      alertTitle,
      caller1,
      'foo bar',
      undefined,
      () => {},
      () => {},
      () => {},
      () => {}
    );
    container.update();
    expect(container.find(AlertCall).length).toEqual(2);
  });
});
