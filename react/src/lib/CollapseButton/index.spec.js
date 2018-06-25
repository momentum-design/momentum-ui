import React from 'react';
import { mount, shallow } from 'enzyme';
import { CollapseButton } from '@collab-ui/react';

describe('tests for <CollapseButton />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<CollapseButton/>);

    expect(container).toMatchSnapshot();
  });

  it('should call onClick callback when the button is clicked', () => {
    const onClick = jest.fn();
    const container = mount(<CollapseButton onClick={onClick} />);
    container.find('.cui-button').simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

  it('when collapse is true it should display right icon and label', () => {
    const container = shallow(<CollapseButton collapse={true} />);
    expect(container.find('Icon').props().name).toEqual('arrow-right-optical_14');
    expect(container.find('Button').props().ariaLabel).toEqual('expand');
  });

  it('when collapse is false it should display right icon and label', () => {
    const container = shallow(<CollapseButton collapse={false} />);
    expect(container.find('Icon').props().name).toEqual('arrow-left-optical_14');
    expect(container.find('Button').props().ariaLabel).toEqual('collapse');
  });

  describe('should apply correct alignment classes', () => {

    it('when alignment is left', () => {
      const container = shallow(<CollapseButton alignment={'left'} />);
      expect(container.find('.cui-collapse-button').hasClass('cui-collapse-button--left')).toEqual(true);
    });

    it('when alignment is right', () => {
      const container = shallow(<CollapseButton alignment={'right'} />);
      expect(container.find('.cui-collapse-button').hasClass('cui-collapse-button--right')).toEqual(true);
    });

    it('when alignment is top', () => {
      const container = shallow(<CollapseButton alignment={'top'} />);
      expect(container.find('.cui-collapse-button').hasClass('cui-collapse-button--top')).toEqual(true);
    });

    it('when alignment is down', () => {
      const container = shallow(<CollapseButton alignment={'bottom'} />);
      expect(container.find('.cui-collapse-button').hasClass('cui-collapse-button--bottom')).toEqual(true);
    });
  });

});
