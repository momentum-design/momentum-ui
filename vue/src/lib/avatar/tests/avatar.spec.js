import { mount, shallowMount } from '@vue/test-utils';
import Avatar from '../index.vue';
import Button from '../../button/index.vue';
import Icon from '../../icon/index.vue';
import Loading from '../../loading/index.vue';
import Vue from 'vue';

Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);
Vue.component(Loading.name, Loading);

describe('Avatar', () => {
  it('should match snapshot', () => {
    const container = shallowMount(Avatar);
    expect(container.html()).toMatchSnapshot();
  });

  it('sequence of image load  ', () => {
    const container = shallowMount(Avatar, {
      propsData: {
        title: 'Test Name',
        src: 'test.png',
      }
    });

    expect(container.find('.md-avatar__img').classes('md-avatar__img--hidden')).toEqual(true);
    expect(container.findAll('.md-avatar__letter').length).toEqual(1);

    container.vm.isImageLoaded = true;

    expect(container.find('.md-avatar__img').classes('md-avatar__img--hidden')).toEqual(false);
    expect(container.find('.md-avatar__letter').exists()).toEqual(false);
  });

  it('should handle isDecrypting prop', () => {
    const container = shallowMount(Avatar, {
      propsData: {
        title: 'Test Name',
        isDecrypting: true,
      },
      slots: {
        icon: `<md-icon name='handset_24' />`
      }
    });

    expect(container.findAll('.md-decrypting').length).toEqual(1);
  });

  it('should handle isOverview prop', () => {
    const container = shallowMount(Avatar, {
      propsData: {
        title: 'Test Name',
        isOverview: true,
      },
      slots: {
        icon: `<md-icon name='handset_24' />`
      }
    });

    expect(container.findAll('.md-avatar__icon--overview').length).toEqual(1);
  });

  it('should trim title', () => {
    const container = shallowMount(Avatar, {
      propsData: {
        title: '    Test Name     ',
        src: 'test.png',
      },
    });
    expect(container.find('.md-avatar__letter').text()).toEqual('TN');
  });

  it('should display title for user', () => {
    const container = shallowMount(Avatar, {
      propsData: {
        title: 'Test Name',
        src: 'test.png',
      },
    });
    expect(container.find('.md-avatar__letter').text()).toEqual('TN');
  });

  it('should display title for group', () => {
    const container = shallowMount(Avatar, {
      propsData: {
        title: 'Test Group',
        type: 'group',
        src: 'test.png',
      },
    });
    expect(container.find('.md-avatar__letter').text()).toEqual('T');
  });

  it('should display title for group', () => {
    const container = shallowMount(Avatar, {
      propsData: {
        title: 'Test Group',
        type: 'group',
        src: 'test.png',
      },
    });
    expect(container.find('.md-avatar__letter').text()).toEqual('T');
    expect(container.find('.md-avatar').props().title).toEqual('Test Group');
  });

  it('should handle dark theme', () => {
    const container = shallowMount(Avatar, {
      propsData: {
        theme: 'dark',
      },
    });
    expect(container.findAll('.md-avatar--dark').length).toEqual(1);
  });

  describe('should apply respective classes for types', () => {

    it('when the type is group', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Group',
          type: 'group',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--group').length).toEqual(1);
    });

    it('when the type is active', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          type: 'active',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--active').length).toEqual(1);
    });

    it('when the type is inactive', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          type: 'inactive',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--inactive').length).toEqual(1);
    });

    it('when the type is Do Not Disturb', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          type: 'dnd',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--dnd').length).toEqual(1);
    });

    it('when the type is Out of Office', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          type: 'ooo',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--ooo').length).toEqual(1);
    });

    it('when the type is call', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          type: 'call',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--call').length).toEqual(1);
    });

    it('when the type is meeting', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          type: 'meeting',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--meeting').length).toEqual(1);
    });

    it('when the type is presenting', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          type: 'presenting',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--presenting').length).toEqual(1);
    });

    it('when the type is typing', () => {
      const container = mount(Avatar, {
        propsData: {
          title: 'Test Name',
          type: 'typing',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--typing').length).toEqual(1);
      expect(container.findAll('.md-loading').length).toEqual(1);
    });

    it('when the type is bot', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          type: 'bot',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--bot').length).toEqual(1);
    });

    describe('should for type self apply correct icon size', () => {

      it('when size is 36', () => {
        const container = mount(Avatar, {
          propsData: {
            title: 'Test Name',
            type: 'self',
            size: 36,
            src: 'test.png',
          },
        });

        expect(container.find('.md-icon').attributes().style).toEqual('font-size: 16px;');
        expect(container.findAll('.md-avatar__self').length).toEqual(1);
      });

      it('when the size is default(medium)', () => {
        const container = mount(Avatar, {
          propsData: {
            title: 'Test Name',
            type: 'self',
            src: 'test.png',
          },
        });

        expect(container.find('.md-icon').attributes().style).toEqual('font-size: 18px;');
        expect(container.findAll('.md-avatar__self').length).toEqual(1);
      });

      it('when size is 40', () => {
        const container = mount(Avatar, {
          propsData: {
            title: 'Test Name',
            type: 'self',
            size: 40,
            src: 'test.png',
          },
        });

        expect(container.find('.md-icon').attributes().style).toEqual('font-size: 18px;');
        expect(container.findAll('.md-avatar__self').length).toEqual(1);
      });

    });

    it('when the failureBadge is true', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          type: 'self',
          failureBadge: true,
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar__failure-badge').length).toEqual(1);
    });

    it('when the hasNotification is true', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          type: 'self',
          hasNotification: true,
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar__notification-badge').length).toEqual(1);
    });

  });

  describe('should apply respective classes for size', () => {

    it('when size is 18/xsmall', () => {
      let container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 'xsmall',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--xsmall').length).toEqual(1);
      container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 18,
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--18').length).toEqual(1);
    });

    it('when size is 24', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 24,
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--24').length).toEqual(1);
    });

    it('when size is 28/small', () => {
      let container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 'small',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--small').length).toEqual(1);
      container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 28,
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--28').length).toEqual(1);
    });

    it('when size is 36', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 36,
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--36').length).toEqual(1);
    });

    it('when size is 40/medium(default)', () => {
      let container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--medium').length).toEqual(1);
      container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 40,
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--40').length).toEqual(1);
    });

    it('when size is 44', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 44,
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--44').length).toEqual(1);
    });

    it('when size is 52/large', () => {
      let container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 'large',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--large').length).toEqual(1);
      container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 52,
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--52').length).toEqual(1);
    });

    it('when size is 56', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 56,
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--56').length).toEqual(1);
    });

    it('when size is 72', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 72,
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--72').length).toEqual(1);
    });

    it('when size is 80', () => {
      const container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 80,
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--80').length).toEqual(1);
    });

    it('when size is 84/xlarge', () => {
      let container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 'xlarge',
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--xlarge').length).toEqual(1);
      container = shallowMount(Avatar, {
        propsData: {
          title: 'Test Name',
          size: 84,
          src: 'test.png',
        },
      });
      expect(container.findAll('.md-avatar--84').length).toEqual(1);
    });
  });

  it('should apply clickable class when onClick prop is defined', () => {
    let container = shallowMount(Avatar, {
      propsData: {
        title: 'Test Name',
        size: 'xlarge',
        src: 'test.png',
      },
      listeners: {
        click: ()=>{}
      },
      attrs: {
        ariaLabel: 'Test onClick'
      }
    });

    expect(container.findAll('.md-avatar--clickable').length).toEqual(1);
  });

  it('should not apply clickable class when onClick prop is undefined', () => {
    let container = shallowMount(Avatar, {
      propsData: {
        title: 'Test Name',
        src: 'test.png',
      },
    });

    expect(container.findAll('.md-avatar--clickable').length).toEqual(0);
  });

  it('should display icon', () => {
    const container = shallowMount(Avatar, {
      propsData: {
        title: 'Test Name',
      },
      slots: {
        icon: `<md-icon name="test" />`
      }
    });
    expect(container.findAll('.md-avatar__icon').length).toEqual(1);
  });

  it('should display tooltip', () => {
    const container = shallowMount(Avatar, {
      propsData: {
        title: 'Test Name',
        hideDefaultTooltip: true,
      },
    });
    expect(container.find('.md-avatar').attributes().title).toEqual('');
  });

  it('should wrap in button', () => {
    const container = mount(Avatar, {
      propsData: {
        title: 'Test Name',
      },
      listeners: {
        click: ()=>{}
      },
      attrs: {
        ariaLabel: 'Test onClick'
      }
    });
    expect(container.find('.md-button').exists()).toEqual(true);
    expect(container.find('.md-button--none').exists()).toEqual(true);
  });

  it('should handle onClick event', () => {
    const onClick = jest.fn();

    const container = mount(Avatar, {
      propsData: {
        title: 'Test Name',
      },
      listeners: {
        click: onClick
      },
      attrs: {
        ariaLabel: 'Test onClick'
      }
    });

    container.find('button').trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should pass other props to the avatar', () => {
    const container = shallowMount(Avatar, {
      propsData: {
        name: 'accessibility_16',
        id: 'testId',
      }
    });
    const avatarEle = container.find('.md-avatar');
    expect(avatarEle.attributes().id).toEqual('testId');
  });

  it('should pass other props to the button if onClick Present', () => {
    const container = mount(Avatar, {
      propsData: {
        name: 'accessibility_16',
        id: 'testId',
      },
      listeners: {
        click: ()=>{}
      },
      attrs: {
        ariaLabel: 'Test onClick'
      }
    });
    const buttonEle = container.find('button');
    expect(buttonEle.attributes().id).toEqual('testId');
  });

  it('should render when title is only spaces', () => {
    const container = shallowMount(Avatar, {
      propsData: {
        title: '  ',
        size: 36,
        src: 'test.png'
      }
    });
    expect(container.findAll('.md-avatar__letter').length).toEqual(1);
  });
});

