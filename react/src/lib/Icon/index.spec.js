import React from 'react';
import { shallow, mount } from 'enzyme';
import { Icon } from '@collab-ui/react';

describe('Tests for <Icon />', () => {
  it('should match SnapShot', () => {
    const props = {
      name: 'accessibility_16',
      color: 'blue',
      className: 'testClass',
    };
    const container = shallow(<Icon {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should wrap in button', () => {
    const props = {
      name: 'accessibility_16',
      isClickable: true,
      ariaLabel: 'Accesible',
    };

    const container = mount(<Icon {...props} />);
    expect(container.find('.cui-button').exists()).toEqual(true);
    expect(container.find('.cui-button--icon').exists()).toEqual(true);
  });

  it('should wrap in button and add type class', () => {
    const props = {
      name: 'accessibility_16',
      type: 'white',
      isClickable: true,
      ariaLabel: 'Accesible',
    };

    const container = mount(<Icon {...props} />);
    expect(container.find('.cui-button--icon-white').exists()).toEqual(true);
  });

  describe('Test the sizes of <Icon />', () => {
    it('should match SnapShot', () => {
      const props = {
        name: 'accessibility_16',
        size: 24,
        color: 'red',
        className: 'testClass',
      };
      const container = shallow(<Icon {...props} />);
      expect(container).toMatchSnapshot();
    });

    it('should set height/width from size attribute if specified', () => {
      const props = {
        name: 'accessibility_16',
        size: 24,
        color: 'red',
        className: 'testClass',
      };
      const container = mount(<Icon {...props} />);
      const svgEle = container.find('svg');
      expect(svgEle.props().height).toEqual(24);
      expect(svgEle.props().width).toEqual(24);
    });

    it('should set height/width from icon name', () => {
      const props = {
        name: 'accessibility_16',
        className: 'testClass',
      };
      const container = mount(<Icon {...props} />);
      const svgEle = container.find('svg');
      expect(svgEle.props().height).toEqual(16);
      expect(svgEle.props().width).toEqual(16);
    });

    it('should set height/width to default if not specified and not in the name', () => {
      const props = {
        name: 'cisco-logo',
        className: 'testClass',
      };
      const container = mount(<Icon {...props} />);
      const svgEle = container.find('svg');
      expect(svgEle.props().height).toEqual(16);
      expect(svgEle.props().width).toEqual(16);
    });
  });

  it('should pass the classNames onto the icon', () => {
    const props = {
      name: 'accessibility_16',
      className: 'testClass',
    };
    const container = mount(<Icon {...props} />);
    const svgEle = container.find('svg');
    expect(svgEle.props().className).toEqual('cui-icon testClass');
  });

  it('should pass other props to the icon', () => {
    const props = {
      name: 'accessibility_16',
      className: 'testClass',
      id: 'testId',
    };
    const container = mount(<Icon {...props} />);
    const svgEle = container.find('svg');
    expect(svgEle.props().id).toEqual(props.id);
  });

  describe('Test the colors of <Icon />', () => {
    it('should match SnapShot', () => {
      const props = {
        name: 'accessibility_16',
      };
      const container = shallow(<Icon {...props} />);
      expect(container).toMatchSnapshot();
    });

    it('should set fill color to default inherit when not specified by prop', () => {
      const props = {
        name: 'accessibility_16',
      };
      const container = mount(<Icon {...props} />);
      const svgEle = container.find('g');
      expect(svgEle.props().fill).toEqual('inherit');
    });

    it('should set fill color to rgba when color is set to white-60 (without $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: '$white-60',
      };
      const container = mount(<Icon {...props} />);
      const svgEle = container.find('g');
      expect(svgEle.props().fill).toEqual('rgba(255, 255, 255, 0.6)');
    });

    it('should set fill color to rgba when color is set to $white-60 (with $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: 'white-60',
      };
      const container = mount(<Icon {...props} />);
      const svgEle = container.find('g');
      expect(svgEle.props().fill).toEqual('rgba(255, 255, 255, 0.6)');
    });

    it('should set fill color to rgba when color is set to $black-60 (with $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: 'black-60',
      };
      const container = mount(<Icon {...props} />);
      const svgEle = container.find('g');
      expect(svgEle.props().fill).toEqual('rgba(0, 0, 0, 0.6)');
    });

    it('should set fill color to rgba when color is set to $black-60 (with $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: 'black-60',
      };
      const container = mount(<Icon {...props} />);
      const svgEle = container.find('g');
      expect(svgEle.props().fill).toEqual('rgba(0, 0, 0, 0.6)');
    });

    it('should set fill color to #07C1E4 when color is set to $blue (with $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: '$blue',
      };
      const container = mount(<Icon {...props} />);
      const svgEle = container.find('g');
      expect(svgEle.props().fill).toEqual('#07C1E4');
    });

    it('should set fill color to #07C1E4 when color is set to blue (without $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: 'blue',
      };
      const container = mount(<Icon {...props} />);
      const svgEle = container.find('g');
      expect(svgEle.props().fill).toEqual('#07C1E4');
    });

    it('should set fill color to #07C1E4 when color is set to hex value and return a warning.', () => {
      global.console = { warn: jest.fn() };
      const props = {
        name: 'accessibility_16',
        color: '#07C1E4',
      };
      const container = mount(<Icon {...props} />);
      const svgEle = container.find('g');
      expect(svgEle.props().fill).toEqual('#07C1E4');
      expect(global.console.warn).toHaveBeenCalledTimes(1);
    });

    it('should log a warning when color opacity does not exist in collab-ui', () => {
      global.console = { warn: jest.fn() };
      const props = {
        name: 'accessibility_16',
        color: '$white-89',
      };
      mount(<Icon {...props} />);
      expect(global.console.warn).toHaveBeenCalledTimes(1);
    });

    it('should log a warning when color variable does not exist in collab-ui', () => {
      global.console = { warn: jest.fn() };
      const props = {
        name: 'accessibility_16',
        color: 'not-a-color',
      };
      mount(<Icon {...props} />);
      expect(global.console.warn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test the accessibilty of <Icon />', () => {
    const title = 'Test Title';
    const description = 'This is a test description';
    it('should match SnapShot', () => {
      const props = {
        name: 'accessibility_16',
        title,
        description,
      };
      const container = shallow(<Icon {...props} />);
      expect(container).toMatchSnapshot();
    });

    it('should match SnapShot', () => {
      const props = {
        name: 'accessibility_16',
        isAria: false,
        title,
        description,
      };
      const container = shallow(<Icon {...props} />);
      expect(container).toMatchSnapshot();
    });

    it('should title from icon name', () => {
      const props = {
        name: 'accessibility_16',
      };
      const container = mount(<Icon {...props} />);
      const titleEle = container.find('title');
      expect(titleEle.text()).toEqual('Accessibility 16');
    });

    it('should set title & description elements and aria-labelledby attribute from props', () => {
      const props = {
        name: 'accessibility_16',
        title,
        description,
      };
      const container = mount(<Icon {...props} />);
      const svgEle = container.find('svg');
      const titleEle = container.find('title');
      const descEle = container.find('desc');
      expect(titleEle.text()).toEqual(title);
      expect(descEle.text()).toEqual(description);
      expect(svgEle.html().includes('aria-labelledby'));
    });

    it('should not render title & description elements or aria-labelledby attribute, if isAria is false', () => {
      const props = {
        name: 'accessibility_16',
        isAria: false,
        title,
        description,
      };
      const container = mount(<Icon {...props} />);
      const svgEle = container.find('svg');
      const titleEle = container.find('title');
      const descEle = container.find('desc');
      expect(titleEle.exists()).toBeFalsy();
      expect(descEle.exists()).toBeFalsy();
      expect(svgEle.html().includes('aria-labelledby')).toBeFalsy();
    });
  });

  it('should log a warning if the icon does not exist in Collab UI Icons', () => {
    global.console = { warn: jest.fn() };
    const props = {
      name: 'not-an-icon_16',
    };
    mount(<Icon {...props} />);
    expect(global.console.warn).toHaveBeenCalledTimes(1);
  });
});
