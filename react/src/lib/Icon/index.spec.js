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

    it('should set font-size from size attribute if specified', () => {
      const props = {
        name: 'accessibility_16',
        size: 24,
        color: 'red',
        className: 'testClass',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.fontSize).toEqual('24px');
    });

    it('should set font-size from icon name', () => {
      const props = {
        name: 'accessibility_16',
        className: 'testClass',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.fontSize).toEqual('16px');
    });

    it('should set font-size to default if not specified and not in the name', () => {
      const props = {
        name: 'cisco-logo',
        className: 'testClass',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.fontSize).toEqual('16px');
    });
  });

  describe('Test the name prop of <Icon />', () => {
    it('should be able to take the name without the "icon-" prefix', () => {
      const props = {
        name: 'accessibility_16',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.props().className).toEqual('cui-icon icon icon-accessibility_16');
    });

    it('should be able to take the name WITH the "icon-" prefix', () => {
      const props = {
        name: 'icon-accessibility_16',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.props().className).toEqual('cui-icon icon icon-accessibility_16');
    });
  });

  it('should pass the classNames onto the icon', () => {
    const props = {
      name: 'accessibility_16',
      className: 'testClass',
    };
    const container = mount(<Icon {...props} />);
    const iEle = container.find('i');
    expect(iEle.props().className).toEqual('cui-icon icon icon-accessibility_16 testClass');
  });

  it('should pass other props to the icon', () => {
    const props = {
      name: 'accessibility_16',
      className: 'testClass',
      id: 'testId',
    };
    const container = mount(<Icon {...props} />);
    const iEle = container.find('i');
    expect(iEle.props().id).toEqual(props.id);
  });

  describe('Test the button <Icon />', () => {
    it('should wrap in button', () => {
      const props = {
        name: 'accessibility_16',
        onClick: () => {},
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
        onClick: () => {},
        ariaLabel: 'Accesible',
      };

      const container = mount(<Icon {...props} />);
      expect(container.find('.cui-button--icon-white').exists()).toEqual(true);
    });

    it('should pass other props to the button if onClick Present', () => {
      const props = {
        name: 'accessibility_16',
        className: 'testClass',
        id: 'testId',
        ariaLabel: 'Testing',
        onClick: () => {},
      };
      const container = mount(<Icon {...props} />);
      const buttonEle = container.find('button');
      expect(buttonEle.props().id).toEqual(props.id);
    });
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
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.color).toEqual('');
    });

    it('should set fill color to rgba when color is set to white-60 (without $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: '$white-60',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.color).toEqual('rgba(255, 255, 255, 0.6)');
    });

    it('should set fill color to rgba when color is set to $white-60 (with $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: 'white-60',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.color).toEqual('rgba(255, 255, 255, 0.6)');
    });

    it('should set fill color to rgba when color is set to $black-60 (with $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: 'black-60',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.color).toEqual('rgba(0, 0, 0, 0.6)');
    });

    it('should set fill color to rgba when color is set to $black-60 (with $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: 'black-60',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.color).toEqual('rgba(0, 0, 0, 0.6)');
    });

    it('should set fill color to #07C1E4 when color is set to $blue (with $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: '$blue',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.color).toEqual('rgb(7, 193, 228)');
    });

    it('should set fill color to #07C1E4 when color is set to blue (without $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: 'blue',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.color).toEqual('rgb(7, 193, 228)');
    });

    it('should set fill color to #07C1E4 when color is set to hex value and return a warning.', () => {
      global.console = { warn: jest.fn() };
      const props = {
        name: 'accessibility_16',
        color: '#07C1E4',
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().style.color).toEqual('rgb(7, 193, 228)');
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

    it('should set aria-label attribute from title prop', () => {
      const props = {
        name: 'accessibility_16',
        title,
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().attributes['aria-label'].value).toEqual(title);
    });

    it('should set aria-label attribute from description prop', () => {
      const props = {
        name: 'accessibility_16',
        description,
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().attributes['aria-label'].value).toEqual(description);
    });

    it('should set aria-label attribute from title & description props', () => {
      const props = {
        name: 'accessibility_16',
        title,
        description,
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().attributes['aria-label'].value).toEqual(`${title} ${description}`);
    });

    it('should set aria-label attribute from ariaLabel prop', () => {
      const props = {
        name: 'accessibility_16',
        ariaLabel: title,
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().attributes['aria-label'].value).toEqual(title);
    });

    it('should set aria-label attribute from aria-label prop', () => {
      const props = {
        name: 'accessibility_16',
        'aria-label': title,
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.getDOMNode().attributes['aria-label'].value).toEqual(title);
    });

    it('should not render aria-label attribute, if isAria is false', () => {
      global.console = { warn: jest.fn() };
      const props = {
        name: 'accessibility_16',
        isAria: false,
        title,
        description,
      };
      const container = mount(<Icon {...props} />);
      const iEle = container.find('i');
      expect(iEle.html().includes('aria-label')).toBeFalsy();
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
