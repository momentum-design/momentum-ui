import React from 'react';
import { shallow, mount } from 'enzyme';
import { Alert, AlertContainer } from '@collab-ui/react';

describe('tests for <AlertContainer />', () => {
  const alertTitle = 'Now Hear This!';
  const alertMessage = 'Jefe Guadelupe, unit tesing like a boss!';

  it('should match SnapShot', () => {
    const container = shallow(<AlertContainer/>);

    expect(container).toMatchSnapshot();
  });

  it('should render a div in bottom-right by default', () => {
    const container = shallow(<AlertContainer />);

    expect(container.find('.cui-alert__container--bottom-right').length).toEqual(1);
  });

  it('should honor position prop when top-left is passed in', () => {
    const container = shallow(<AlertContainer position={'top-left'}/>);

    expect(container.find('.cui-alert__container--top-left').length).toEqual(1);
  });

  it('should honor position prop when top-center is passed in', () => {
    const container = shallow(<AlertContainer position={'top-center'}/>);

    expect(container.find('.cui-alert__container--top-center').length).toEqual(1);
  });

  it('should honor position prop when top-right is passed in', () => {
    const container = shallow(<AlertContainer position={'top-right'}/>);

    expect(container.find('.cui-alert__container--top-right').length).toEqual(1);
  });

  it('should honor position prop when bottom-left is passed in', () => {
    const container = shallow(<AlertContainer position={'bottom-left'}/>);

    expect(container.find('.cui-alert__container--bottom-left').length).toEqual(1);
  });

  it('should honor position prop when bottom-center is passed in', () => {
    const container = shallow(<AlertContainer position={'bottom-center'}/>);

    expect(container.find('.cui-alert__container--bottom-center').length).toEqual(1);
  });

  it('should honor position prop when bottom-right is passed in', () => {
    const container = shallow(<AlertContainer position={'bottom-right'}/>);

    expect(container.find('.cui-alert__container--bottom-right').length).toEqual(1);
  });

  it('should render an info Alert when info() is called', () => {
    const container = mount(<AlertContainer/>);
    container.instance().info(
      alertTitle,
      alertMessage,
      () => {},
      { ariaLabel: 'Close' }
    );
    container.update();
    expect(container.find('.cui-alert--info').length).toEqual(1);
  });

  it('should render a success Alert when success() is called', () => {
    const container = mount(<AlertContainer/>);
    container.instance().success(
      alertTitle,
      alertMessage,
      () => {},
      { ariaLabel: 'Close' }
    );
    container.update();
    expect(container.find('.cui-alert--success').length).toEqual(1);
  });

  it('should render a warning Alert when warning() is called', () => {
    const container = mount(<AlertContainer/>);
    container.instance().warning(
      alertTitle,
      alertMessage,
      () => {},
      { ariaLabel: 'Close' }
    );
    container.update();
    expect(container.find('.cui-alert--warning').length).toEqual(1);
  });

  it('should render an error Alert when error() is called', () => {
    const container = mount(<AlertContainer/>);
    container.instance().error(
      alertTitle,
      alertMessage,
      () => {},
      { ariaLabel: 'Close' }
    );
    container.update();
    expect(container.find('.cui-alert--error').length).toEqual(1);
  });

  it('number of Alerts should equal number of times functions are called', () => {
    const container = mount(<AlertContainer/>);
    const alertCount = 5;

    for (let index = 0; index < alertCount; index++) {
      container.instance().info(
        alertTitle,
        alertMessage,
        () => {},
        { ariaLabel: 'Close' }
      );
    }
    container.update();
    expect(container.find(Alert).length).toEqual(alertCount);
  });


  it('should pass any other HTML props to Alert', () => {
    const container = mount(<AlertContainer/>);
    container.instance().info(
      alertTitle,
      alertMessage,
      () => {},
      { ariaLabel: 'Close', id: 'testProp' }
    );
    container.update();
    expect(container.find('button').props().id).toEqual('testProp');
  });
});
