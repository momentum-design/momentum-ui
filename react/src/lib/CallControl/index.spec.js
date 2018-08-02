import React from 'react';
import { shallow, mount } from 'enzyme';
import { CallControl } from '@collab-ui/react';

describe('tests for <CallControl />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<CallControl type='microphone-muted' ariaLabel='test' />);

    expect(container).toMatchSnapshot();
  });

  it('should render one Call Control button', () => {
    const container = shallow(<CallControl type='microphone-muted' ariaLabel='test' />);

    expect(container.find('Button').length).toEqual(1);
  });

  it('should handle disabled state', () => {
    const container = shallow(<CallControl type='microphone-muted' disabled ariaLabel='test' />);

    expect(container.props().disabled).toEqual(true);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<CallControl type='microphone-muted' onClick={countUp} ariaLabel='test' />);

    container.find('Button').simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle keyDown as onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<CallControl type='microphone-muted' onClick={countUp} ariaLabel='test' />);

    container.find('Button').simulate('click');
    container
      .find('Button')
      .simulate('keyDown', { which: 13, charCode: 13, key: 'Space' });
    expect(count).toEqual(2);
  });

  it('should render cancel type', () => {
    const container = mount(<CallControl type='cancel' ariaLabel='test' />);

    expect(container.find('Button').hasClass('cui-call-control--cancel')).toEqual(true);
  });

  it('should handle iconSize of 20', () => {
    const container = mount(<CallControl type='microphone-muted' ariaLabel='test' iconSize={10}/>);

    const svgEle = container.find('svg');
    expect(svgEle.props().height).toEqual(10);
    expect(svgEle.props().width).toEqual(10);
  });

  it('should handle iconSize of 40', () => {
    const container = mount(<CallControl type='microphone-muted' ariaLabel='test' iconSize={16}/>);

    const svgEle = container.find('svg');
    expect(svgEle.props().height).toEqual(16);
    expect(svgEle.props().width).toEqual(16);
  });

});
