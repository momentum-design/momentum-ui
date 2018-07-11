import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button, Loading } from '@collab-ui/react';

describe('tests for <Button />', () => {
  it('should match SnapShot', () => {
    const container = shallow(<Button children='test' ariaLabel='test' />);

    expect(container).toMatchSnapshot();
  });

  it('should render one Button', () => {
    const container = shallow(<Button children='test' ariaLabel='test' />);

    expect(container.find('button').length).toEqual(1);
  });

  it('should render one Child Div', () => {
    const container = shallow(
      <Button children='test' ariaLabel='test'>
        <div>Test</div>
      </Button>
    );

    expect(container.find('button').children().length).toEqual(1);
  });

  it('should render Loader Component if Loading', () => {
    const container = shallow(<Button children='test' loading ariaLabel='test' />);

    expect(container.contains(<Loading />)).toEqual(true);
  });

  it('should not render Loader Component if loading prop absent', () => {
    const container = shallow(<Button children='test' color='none' ariaLabel='test' />);

    expect(container.contains(<Loading />)).toEqual(false);
  });

  it('should render wrapped button if label passed', () => {
    const container = shallow(<Button children='test' label='test' ariaLabel='test' />);

    expect(container.find('.cui-button__container--small').length).toEqual(1);
  });

  it('should render wrapped button in large container if label and containerLarge passed', () => {
    const container = shallow(<Button children='test' label='test' containerLarge ariaLabel='test' />);

    expect(container.find('.cui-button__container').length).toEqual(1);
  });

  it('should be type button by default', () => {
    const container = shallow(<Button children='test' ariaLabel='test' />);

    expect(container.props().type).toEqual('button');
  });

  it('should show active class when passed active prop', () => {
    const container = shallow(<Button active children='test' ariaLabel='test' />);

    expect(container.find('.cui-button').hasClass('active')).toEqual(true);
  });

  it('should show type if passed one', () => {
    const container = shallow(<Button children='test' type='submit' ariaLabel='test' />);

    expect(container.props().type).toEqual('submit');
  });

  it('should output anchor if passed tag a', () => {
    const container = shallow(<Button children='test' tag='a' ariaLabel='test' />);

    expect(container.find('a').length).toEqual(1);
  });

  it('should handle disabled state', () => {
    const container = shallow(<Button children='test' disabled ariaLabel='test' />);

    expect(container.props().disabled).toEqual(true);
  });

  it('should handle onClick event', () => {
    const handleClick = jest.fn();
    const onClick = jest.fn();
    const container = shallow(<Button children='test' onClick={onClick} ariaLabel='test' />, {
      context: {
        handleClick: handleClick
      }
    });

    container.find('button').simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should handle keyDown as onClick event for enter/space key', () => {
    const handleClick = jest.fn();
    const onClick = jest.fn();
    const container = mount(<Button children='test' onClick={onClick} ariaLabel='test' />, {
      context: {
        handleClick: handleClick
      }
    });

    container
      .find('button')
      .simulate('keyDown', { which: 13, charCode: 13, key: 'Enter' })
      .simulate('keyDown', { which: 32, charCode: 32, key: 'Space' });

    expect(onClick).toHaveBeenCalledTimes(2);
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('should call context handleKeyDown callback on keyDown event (other than enter/space)', () => {
    const handleKeyDown = jest.fn();
    const container = mount(<Button children='test' ariaLabel='test' />, {
      context: {
        handleKeyDown: handleKeyDown
      }
    });
    container
        .find('button')
        .simulate('keyDown', { which: 39, charCode: 39, key: 'Right' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  describe('tabIndex value of the button', () => {
    it('when the button is focused tabIndex should be zero', () => {
      const container = mount(<Button children='test' index={0} ariaLabel='test' />, {
        context: {
          focusIndex: 0
        }
      });
      expect(container.find('button').props().tabIndex).toEqual(0);
    });

    it('when the button is not focused tabIndex should be -1', () => {
      const container = mount(<Button children='test' index={0} ariaLabel='test' />, {
        context: {
          focusIndex: 1
        }
      });
      expect(container.find('button').props().tabIndex).toEqual(-1);
    });

    it('when the index prop is not defined the tabIndex should be 0', () => {
      const container = mount(<Button children='test' ariaLabel='test' />);
      expect(container.find('button').props().tabIndex).toEqual(0);
    });
  });

  describe('test size Prop', () => {
    const props = {
      children: 'test',
      ariaLabel: 'test'
    };

    const circleProps = {
      circle: true,
      ...props
    }

    it('should warn and apply base size class if size used does not exist', () => {
      global.console = {warn: jest.fn()};
      const container = mount(<Button {...props} size={5000} />);

      expect(container.find('.cui-button--36').exists()).toEqual(true);
      expect(global.console.warn).toHaveBeenCalled();
    });

    it('should warn and apply 52 size class if large prop is used', () => {
      global.console = {warn: jest.fn()};
      const container = mount(<Button {...props} large />);

      expect(container.find('.cui-button--52').exists()).toEqual(true);
      expect(global.console.warn).toHaveBeenCalled();
    });

    it('should warn and apply base size class if large props is used with circle', () => {
      global.console = {warn: jest.fn()};
      const container = mount(<Button {...circleProps} large />);

      expect(container.find('.cui-button--44').exists()).toEqual(true);
      expect(global.console.warn).toHaveBeenCalled();
    });

    it('should apply correct class for default size', () => {
      const container = mount(<Button {...props} />);
      expect(container.find('.cui-button--36').exists()).toEqual(true);
    });

    it('should apply correct class for size 28', () => {
      const container = mount(<Button {...props} size={28} />);
      expect(container.find('.cui-button--28').exists()).toEqual(true);
    });

    it('should apply correct class for size 40', () => {
      const container = mount(<Button {...props} size={40} />);
      expect(container.find('.cui-button--40').exists()).toEqual(true);
    });

    it('should apply correct class for size 52', () => {
      const container = mount(<Button {...props} size={52} />);
      expect(container.find('.cui-button--52').exists()).toEqual(true);
    });

    it('should apply correct class for circle size 20', () => {
      const container = mount(<Button {...circleProps} size={20} />);
      expect(container.find('.cui-button--20').exists()).toEqual(true);
    });

    it('should apply correct class for circle size 32', () => {
      const container = mount(<Button {...circleProps} size={32} />);
      expect(container.find('.cui-button--32').exists()).toEqual(true);
    });

    it('should apply correct class for circle size 44', () => {
      const container = mount(<Button {...circleProps} size={44} />);
      expect(container.find('.cui-button--44').exists()).toEqual(true);
    });

    it('should apply correct class for circle size 56', () => {
      const container = mount(<Button {...circleProps} size={56} />);
      expect(container.find('.cui-button--56').exists()).toEqual(true);
    });

    it('should apply correct class for circle size 68', () => {
      const container = mount(<Button {...circleProps} size={68} />);
      expect(container.find('.cui-button--68').exists()).toEqual(true);
    });

    it('should apply correct class for circle size 72', () => {
      const container = mount(<Button {...circleProps} size={72} />);
      expect(container.find('.cui-button--72').exists()).toEqual(true);
    });

    it('should apply correct class for circle size 84', () => {
      const container = mount(<Button {...circleProps} size={84} />);
      expect(container.find('.cui-button--84').exists()).toEqual(true);
    });

  });
});
