import React from 'react';
import { shallow, mount } from 'enzyme';
import CallControl from '../CallControl';

describe('tests for <CallControl />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<CallControl type="microphone-muted" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one Call Control button', () => {
    const container = shallow(<CallControl type="microphone-muted" />);

    expect(container.find('Button').length).toEqual(1);
  });

  it('should handle disabled state', () => {
    const container = shallow(<CallControl type="microphone-muted" disabled />);

    expect(container.props().disabled).toEqual(true);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<CallControl type="microphone-muted" onClick={countUp} />);

    container.find('Button').simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle keyPress as onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<CallControl type="microphone-muted" onClick={countUp} />);

    container.find('Button').simulate('click');
    container
      .find('Button')
      .simulate('keyPress', { which: 13, charCode: 13, key: 'Space' });
    expect(count).toEqual(2);
  });

  it('should render cancel type', () => {
    const container = mount(<CallControl type="cancel"/>);

    expect(container.find('Button').hasClass('cui-call-control--cancel')).toEqual(true);
  });
});
