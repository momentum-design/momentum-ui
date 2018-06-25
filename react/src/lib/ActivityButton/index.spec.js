import React from 'react';
import { shallow, mount } from 'enzyme';
import { ActivityButton } from '@collab-ui/react';

describe('tests for <ActivityButton />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<ActivityButton type='chat' ariaLabel='test' />);

    expect(container).toMatchSnapshot();
  });

  it('should render one ActivityButton button', () => {
    const container = shallow(<ActivityButton type='camera' ariaLabel='test' />);

    expect(container.find('Button').length).toEqual(1);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<ActivityButton type='meetings' onClick={countUp} ariaLabel='test' />);

    container.find('Button').simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle keyDown as onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<ActivityButton type='meetings' onClick={countUp} ariaLabel='test' />);

    container.find('Button').simulate('click');
    container
      .find('Button')
      .simulate('keyDown', { which: 13, charCode: 13, key: 'Space' });
    expect(count).toEqual(2);
  });

  it('should render meetings type', () => {
    const container = mount(<ActivityButton type='meetings' ariaLabel='test' />);

    expect(container.find('Button').hasClass('cui-activity__meetings')).toEqual(true);
  });

  it('should render large meetings type', () => {
    const container = mount(<ActivityButton type='meetings' large ariaLabel='test' />);

    expect(container.find('Button').hasClass('cui-activity__meetings cui-activity--large')).toEqual(true);
  });

  it('should render custom activity', () => {
    const container = mount(<ActivityButton ariaLabel='test' type={{ color: 'red', icon: <span className='icon icon-arrow-left_32' /> }} />);

    expect(container.find('button').hasClass('cui-button cui-button--circle cui-button--red cui-activity')).toEqual(true);
  });
});
