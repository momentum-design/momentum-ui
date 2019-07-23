import { shallowMount } from '@vue/test-utils';
import Button from '../index.vue';
import Loading from '../../loading/index.vue';
import Vue from 'vue';

Vue.component(Loading.name, Loading);

describe('Button', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(Button, {
      propsData: { ariaLabel: 'test' }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render one Button', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: { ariaLabel: 'test' }
    });

    expect(wrapper.findAll('button').length).toEqual(1);
  });

  it('should render one Child Div', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: '<div>Test</div>' },
      propsData: { ariaLabel: 'test' }
    });

    expect(wrapper.find('button').findAll('div').length).toEqual(1);
  });

  it('should render Loader Component if Loading', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test',
        loading: true
      }
    });

    expect(wrapper.contains(Loading)).toBe(true);
  });

  it('should not render Loader Component if loading prop absent', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test',
        color: 'none'
      }
    });

    expect(wrapper.contains(Loading)).toBe(false);
  });

  it('should remove Style with removeStyle prop', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test',
        removeStyle: true
      }
    });

    expect(wrapper.find('.md-button--none').exists()).toEqual(true);
  });

  it('should ignore color or size with removeStyle prop', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test',
        removeStyle: true,
        color: 'blue',
        size: 52
      }
    });

    expect(wrapper.find('.md-button--blue').exists()).toEqual(false);
    expect(wrapper.find('.md-button--52').exists()).toEqual(false);
  });

  it('should apply correct class for color none', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test',
        color: 'none'
      }
    });

    expect(wrapper.find('.md-button--color-none').exists()).toEqual(true);
  });

  it('should render wrapped button if label passed', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test',
        label: 'test'
      }
    });

    expect(wrapper.classes('md-button__container--small')).toBe(true);
  });

  it('should render wrapped button in large wrapper if label and containerLarge passed', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test',
        label: 'test',
        containerLarge: true
      }
    });

    expect(wrapper.classes('md-button__container')).toBe(true);
  });

  it('should be type button by default', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test'
      }
    });

    expect(wrapper.props().type).toEqual('button');
  });

  it('should show active class when passed active prop', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test',
        active: true
      }
    });

    expect(wrapper.find('.md-button').classes('active')).toEqual(true);
  });

  it('should show type if passed one', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test',
        type: 'submit'
      }
    });

    expect(wrapper.props().type).toEqual('submit');
  });

  it('should output anchor if passed tag a', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test',
        tag: 'a'
      }
    });

    expect(wrapper.is('a')).toBe(true);
  });

  it('should handle disabled state', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test',
        disabled: true
      }
    });

    expect(wrapper.props().disabled).toEqual(true);
  });

  it('should handle onClick event', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test'
      }
    });

    wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });

  it('should handle keyDown as onClick event for enter/space key', () => {
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test'
      }
    });

    wrapper.trigger('keydown.enter');
    wrapper.trigger('keydown.space');
    expect(wrapper.emitted().click).toBeTruthy();
  });

  it('should call context handleKeyDown callback on keyDown event (other than enter/space)', () => {
    const handleKeyDown = jest.fn();
    const wrapper = shallowMount(Button, {
      slots: { default: 'test' },
      propsData: {
        ariaLabel: 'test'
      },
      provide: {
        keydown: handleKeyDown
      }
    });

    wrapper.trigger('keydown', {
      charCode: 39
    });

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  describe('tabindex value of the button', () => {
    it('when the button is focused tabindex should be zero', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test',
          index: 0
        },
        provide: {
          group: {
            focusIndex: 0
          }
        }
      });

      expect(wrapper.find('button').attributes().tabindex).toEqual('0');
    });

    it('when the button is not focused tabindex should be -1', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test',
          index: 0
        },
        provide: {
          focusIndex: 1
        }
      });
      expect(wrapper.find('button').attributes().tabindex).toEqual('-1');
    });

    it('when the index prop is not defined the tabindex should be 0', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test'
        }
      });
      expect(wrapper.find('button').attributes().tabindex).toEqual('0');
    });
  });

  describe('test size Prop', () => {
    it('should warn and apply base size class if size used does not exist', () => {
      global.console = {warn: jest.fn()};
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test',
          size: 5000
        }
      });

      expect(wrapper.find('.md-button--36').exists()).toEqual(true);
      expect(global.console.warn).toHaveBeenCalled();
    });

    it('should apply correct class for default size', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test'
        }
      });
      expect(wrapper.find('.md-button--36').exists()).toEqual(true);
    });

    it('should apply correct class for size none', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test',
          size: 'none'
        }
      });
      expect(wrapper.find('.md-button--size-none').exists()).toEqual(true);
    });

    it('should apply correct class for size 28', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test',
          size: 28
        }
      });
      expect(wrapper.find('.md-button--28').exists()).toEqual(true);
    });

    it('should apply correct class for size 40', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test',
          size: 40
        }
      });
      expect(wrapper.find('.md-button--40').exists()).toEqual(true);
    });

    it('should apply correct class for size 52', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test',
          size: 52
        }
      });
      expect(wrapper.find('.md-button--52').exists()).toEqual(true);
    });

    it('should apply correct class for circle size 20', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test',
          circle: true,
          size: 20
        }
      });
      expect(wrapper.find('.md-button--20').exists()).toEqual(true);
    });

    it('should apply correct class for circle size 32', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test',
          circle: true,
          size: 32
        }
      });
      expect(wrapper.find('.md-button--32').exists()).toEqual(true);
    });

    it('should apply correct class for circle size 44', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test',
          circle: true,
          size: 44
        }
      });
      expect(wrapper.find('.md-button--44').exists()).toEqual(true);
    });

    it('should apply correct class for circle size 56', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test',
          circle: true,
          size: 56
        }
      });
      expect(wrapper.find('.md-button--56').exists()).toEqual(true);
    });

    it('should apply correct class for circle size 68', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test',
          circle: true,
          size: 68
        }
      });
      expect(wrapper.find('.md-button--68').exists()).toEqual(true);
    });

    it('should apply correct class for circle size 72', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test',
          circle: true,
          size: 72
        }
      });
      expect(wrapper.find('.md-button--72').exists()).toEqual(true);
    });

    it('should apply correct class for circle size 84', () => {
      const wrapper = shallowMount(Button, {
        slots: { default: 'test' },
        propsData: {
          ariaLabel: 'test',
          circle: true,
          size: 84
        }
      });
      expect(wrapper.find('.md-button--84').exists()).toEqual(true);
    });

  });
});

