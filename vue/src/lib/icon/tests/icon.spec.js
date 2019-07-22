import { mount, shallowMount } from '@vue/test-utils';
import Icon from '../index.vue';
import Button from '../../button/index.vue';
import Vue from 'vue';

Vue.component(Button.name, Button);

describe('Icon', () => {
  it('should match snapshot', () => {
    const props = {
      name: 'accessibility_16',
      color: 'blue-50',
      className: 'testClass',
    };
    const wrapper = shallowMount(Icon, {
      propsData: props
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('Test the sizes of <md-icon />', () => {
    it('should match SnapShot', () => {
      const props = {
        name: 'accessibility_16',
        size: 24,
        color: 'red-50',
        className: 'testClass',
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should set font-size from size attribute if specified', () => {
      const props = {
        name: 'accessibility_16',
        size: 24,
        color: 'red-50',
        className: 'testClass',
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.attributes().style).toContain('font-size: 24px');
    });

    it('should allow sizeOverride prop to change icon size', () => {
      const props = {
        name: 'arrow-up_16',
        size: 24,
        sizeOverride: true,
        color: 'red-50',
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.classes('icon-arrow-up_24')).toBeTruthy();
    });

    it('should set font-size from icon name', () => {
      const props = {
        name: 'accessibility_16',
        className: 'testClass',
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.attributes().style).toContain('font-size: 16px');
    });

    it('should set font-size to default if not specified and not in the name', () => {
      const props = {
        name: 'cisco-logo',
        className: 'testClass',
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.attributes().style).toContain('font-size: 16px');
    });

  });

  describe('Test the name prop of <md-icon />', () => {
    it('should be able to take the name without the "icon-" prefix', () => {
      const props = {
        name: 'accessibility_16',
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.classes('icon-accessibility_16')).toBeTruthy();
    });

    it('should be able to take the name WITH the "icon-" prefix', () => {
      const props = {
        name: 'icon-accessibility_16',
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.classes('icon-accessibility_16')).toBeTruthy();
    });
  });

  it('should pass the classNames onto the icon', () => {
    const props = {
      name: 'accessibility_16',
      className: 'testClass',
    };
    const wrapper = shallowMount(Icon, {
        propsData: props
      });
    const iEle = wrapper.find('i');
    expect(iEle.classes('testClass')).toBeTruthy();
  });

  it('should pass other props to the icon', () => {
    const props = {
      name: 'accessibility_16',
      className: 'testClass',
      id: 'testId',
    };
    const wrapper = shallowMount(Icon, {
        propsData: props
      });
    const iEle = wrapper.find('i');
    expect(iEle.attributes().id).toEqual(props.id);
  });

  describe('Test the button <md-icon />', () => {
    it('should wrap in button', () => {
      const props = {
        name: 'accessibility_16',
        ariaLabel: 'Accesible',
      };

      const wrapper = mount(Icon, {
        propsData: props,
        listeners: {
          click: () => {},
        }
      });
      expect(wrapper.classes()).toContain('md-button');
      expect(wrapper.classes()).toContain('md-button--icon');
    });

    it('should wrap in button and add type class', () => {
      const props = {
        name: 'accessibility_16',
        type: 'white',
        ariaLabel: 'Accesible',
      };

      const wrapper = mount(Icon, {
        propsData: props,
        listeners: {
          click: () => {},
        }
      });
      expect(wrapper.classes()).toContain('md-button--icon-white');
    });

    it('should pass other props to the button if click Present', () => {
      const props = {
        name: 'accessibility_16',
        className: 'testClass',
        id: 'testId',
        ariaLabel: 'Testing',
      };
      const wrapper = shallowMount(Icon, {
        propsData: props,
        listeners: {
          click: () => {},
        }
      });
      expect(wrapper.attributes().id).toEqual(props.id);
    });
  });

  describe('Test the colors of <md-icon />', () => {
    it('should match SnapShot', () => {
      const props = {
        name: 'accessibility_16',
      };
      const wrapper = shallowMount(Icon, {
      propsData: props
    });
      expect(wrapper).toMatchSnapshot();
    });

    it('should set fill color to default inherit when not specified by prop', () => {
      const props = {
        name: 'accessibility_16',
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.attributes().style).not.toContain('color');
    });

    it('should set fill color to rgba when color is set to white-60 (without $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: '$white-60',
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.attributes().style).toContain('color: rgba(255, 255, 255, 0.6)');
    });

    it('should set fill color to rgba when color is set to $white-60 (with $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: 'white-60',
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.attributes().style).toContain('color: rgba(255, 255, 255, 0.6)');
    });

    it('should set fill color to rgb(0, 160, 209) when color is set to $md-blue-50 (with $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: '$md-blue-50',
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.attributes().style).toContain('color: rgb(0, 160, 209)');
    });

    it('should set fill color to rgb(0, 160, 209) when color is set to blue (without $ sign)', () => {
      const props = {
        name: 'accessibility_16',
        color: 'blue-50',
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.attributes().style).toContain('color: rgb(0, 160, 209)');
    });

    it('should set fill color to #00A0D1 when color is set to hex value and return a warning.', () => {
      global.console = { warn: jest.fn() };
      const props = {
        name: 'accessibility_16',
        color: '#00A0D1',
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.attributes().style).toContain('color: rgb(0, 160, 209)');
      expect(global.console.warn).toHaveBeenCalledTimes(1);
    });

    it('should log a warning when color opacity does not exist in momentum-ui', () => {
      global.console = { warn: jest.fn() };
      const props = {
        name: 'accessibility_16',
        color: '$white-89',
      };
      shallowMount(Icon, {
        propsData: props
      });
      expect(global.console.warn).toHaveBeenCalledTimes(1);
    });

    it('should log a warning when color variable does not exist in momentum-ui', () => {
      global.console = { warn: jest.fn() };
      const props = {
        name: 'accessibility_16',
        color: 'not-a-color',
      };
      shallowMount(Icon, {
        propsData: props
      });
      expect(global.console.warn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test the accessibilty of <md-icon />', () => {
    const title = 'Test Title';
    const description = 'This is a test description';
    it('should match SnapShot', () => {
      const props = {
        name: 'accessibility_16',
        title,
        description,
      };
      const wrapper = shallowMount(Icon, {
      propsData: props
    });
      expect(wrapper).toMatchSnapshot();
    });

    it('should match SnapShot', () => {
      const props = {
        name: 'accessibility_16',
        title,
        description,
      };
      const wrapper = shallowMount(Icon, {
      propsData: props
    });
      expect(wrapper).toMatchSnapshot();
    });

    it('should set aria-label attribute from title prop', () => {
      const props = {
        name: 'accessibility_16',
        title,
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.attributes('aria-label')).toEqual(title);
    });

    it('should set aria-label attribute from description prop', () => {
      const props = {
        name: 'accessibility_16',
        description,
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.attributes('aria-label')).toEqual(description);
    });

    it('should set aria-label attribute from title & description props', () => {
      const props = {
        name: 'accessibility_16',
        title,
        description,
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.attributes('aria-label')).toEqual(`${title} ${description}`);
    });

    it('should set aria-label attribute from ariaLabel prop', () => {
      const props = {
        name: 'accessibility_16',
        ariaLabel: title,
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.attributes('aria-label')).toEqual(title);
    });

    it('should set aria-label attribute from aria-label prop', () => {
      const props = {
        name: 'accessibility_16',
        'aria-label': title,
      };
      const wrapper = shallowMount(Icon, {
        propsData: props
      });
      const iEle = wrapper.find('i');
      expect(iEle.attributes('aria-label')).toEqual(title);
    });
  });

  it('should log a warning if the icon does not exist in Momentum UI Icons', () => {
    global.console.warn = jest.fn();
    const props = {
      name: 'not-an-icon_16',
    };
    shallowMount(Icon, {
        propsData: props
      });
    expect(global.console.warn).toHaveBeenCalled();
  });

  it('should allow other styles to be applied', () => {
    const props = {
      name: 'accessibility_16',
      cssStyle: { display: 'none' }
    };

    const wrapper = shallowMount(Icon, {
        propsData: props
      });
    const iEle = wrapper.find('i');
    expect(iEle.attributes().style).toContain('display: none');
  });
});
