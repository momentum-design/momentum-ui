import { shallowMount } from '@vue/test-utils';
import CompositeAvatar from '../index.vue';
import Avatar from '../../avatar/index.vue';
import Vue from 'vue';

Vue.component(Avatar.name, Avatar);


describe('CompositeAvatar', () => {
  it('should match snapshot', () => {
    const container = shallowMount(CompositeAvatar, {
      slots: {
        default: `<md-avatar title="test1" /><md-avatar title="test2" />`
      }
    });
    expect(container.html()).toMatchSnapshot();
  });

  describe('composite avatars of different sizes  ', () => {
    it('when size is small/28', () => {
      let container = shallowMount(CompositeAvatar, {
        propsData: {
          size: 'small',
        },
        slots: {
          default: `<md-avatar title="test1" /><md-avatar title="test2" />`
        }
      });
      expect(
        container
          .find('.md-composite-avatar')
          .classes('md-composite-avatar--small')
      ).toEqual(true);
      expect(container.findAll('.md-avatar').length).toEqual(2);

      container = shallowMount(CompositeAvatar, {
        propsData: {
          size: 28,
        },
        slots: {
          default: `<md-avatar title="test1" /><md-avatar title="test2" />`
        }
      });
      expect(
        container
          .find('.md-composite-avatar')
          .classes('md-composite-avatar--28')
      ).toEqual(true);
    });

    it('when size is medium/40', () => {
      let container = shallowMount(CompositeAvatar, {
        slots: {
          default: `<md-avatar title="test1" /><md-avatar title="test2" />`
        }
      });
      expect(
        container
          .find('.md-composite-avatar')
          .classes('md-composite-avatar--medium')
      ).toEqual(true);
      expect(container.findAll('.md-avatar').length).toEqual(2);

      container = shallowMount(CompositeAvatar, {
        propsData: {
          size: 40,
        },
        slots: {
          default: `<md-avatar title="test1" /><md-avatar title="test2" />`
        }
      });
      expect(
        container
          .find('.md-composite-avatar')
          .classes('md-composite-avatar--40')
      ).toEqual(true);
    });

    it('when size is 84', () => {
      let container = shallowMount(CompositeAvatar, {
        propsData: {
          size: 84,
        },
        slots: {
          default: `<md-avatar title="test1" /><md-avatar title="test2" />`
        }
      });

      expect(container.findAll('.md-avatar').length).toEqual(2);
      expect(
        container
          .find('.md-composite-avatar')
          .classes('md-composite-avatar--84')
      ).toEqual(true);
    });

    it('when size is large/135', () => {
      let container = shallowMount(CompositeAvatar, {
        propsData: {
          size: 'large',
        },
        slots: {
          default: `<md-avatar title="test1" /><md-avatar title="test2" />`
        }
      });
      expect(
        container
          .find('.md-composite-avatar')
          .classes('md-composite-avatar--large')
      ).toEqual(true);
      expect(container.findAll('.md-avatar').length).toEqual(2);

      container = shallowMount(CompositeAvatar, {
        propsData: {
          size: 135,
        },
        slots: {
          default: `<md-avatar title="test1" /><md-avatar title="test2" />`
        }
      });
      expect(
        container
          .find('.md-composite-avatar')
          .classes('md-composite-avatar--135')
      ).toEqual(true);
    });
  });

  it('should not throw an error when 2 Avatar components are not present as children', () => {
    const container = shallowMount(CompositeAvatar, {
      propsData: {
        size: 'large',
      },
      slots: {
        default: `<md-avatar title="test1" />`
      }
    });

    expect(
      container
        .find('.md-composite-avatar')
        .classes('md-composite-avatar--large')
    ).toEqual(true);
  });

  it('should allow Avatar components to be wrapped', () => {
    const container = shallowMount(CompositeAvatar, {
      propsData: {
        size: 'large',
      },
      slots: {
        default: `<div><md-avatar title="test1" /></div>`
      }
    });

    expect(
      container
        .find('.md-composite-avatar')
        .classes('md-composite-avatar--large')
    ).toEqual(true);
  });
});
