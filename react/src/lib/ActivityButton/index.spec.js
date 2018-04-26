import React from 'react';
import { shallow, mount } from 'enzyme';
import ActivityButton from '../ActivityButton';

describe('tests for <ActivityButton />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ActivityButton type="chat" />);

    expect(container).toMatchSnapshot();
  });

  it('should render one ActivityButton button', () => {
    const container = shallow(<ActivityButton type="camera" />);

    expect(container.find('Button').length).toEqual(1);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<ActivityButton type="meetings" onClick={countUp} />);

    container.find('Button').simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle keyPress as onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<ActivityButton type="meetings" onClick={countUp} />);

    container.find('Button').simulate('click');
    container
      .find('Button')
      .simulate('keyPress', { which: 13, charCode: 13, key: 'Space' });
    expect(count).toEqual(2);
  });

  it('should render meetings type', () => {
    const container = mount(<ActivityButton type="meetings"/>);

    expect(container.find('Button').hasClass('cui-activity__meetings')).toEqual(true);
  });

  it('should render large meetings type', () => {
    const container = mount(<ActivityButton type="meetings" large/>);

    expect(container.find('Button').hasClass('cui-activity__meetings cui-activity--large')).toEqual(true);
  });

  it('should render custom activity', () => {
    const container = mount(<ActivityButton type={{ color: 'red', icon: <span className='icon icon-arrow-left_32'/> }} />);

    expect(container.find('button').hasClass('cui-button cui-button--red cui-activity')).toEqual(true);
  });
});
