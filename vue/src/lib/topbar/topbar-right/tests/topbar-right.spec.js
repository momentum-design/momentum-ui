import { shallowMount } from '@vue/test-utils';
import TopbarRight from '../index.vue';

describe('TopbarRight', () => {
  it('should match snapshot', () => {
    const container = shallowMount(TopbarRight, {
      propsData: {
        id: 'test'
      }
    });
    expect(container.html()).toMatchSnapshot();
  });

  it('should render one TopbarRight', () => {
    const container = shallowMount(TopbarRight);

    expect(container.classes('md-top-bar__right')).toBeTruthy();
  });

  it('should add customized class name if class prop is set', () => {
    const container = shallowMount(TopbarRight, {
      propsData: {
        class: 'testClassName'
      }
    });

    expect(container.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children', () => {
    const container = shallowMount(TopbarRight, {
      slots: {
        default: `<div class="testingforTbR" />`
      }
    });

    expect(container.findAll('.testingforTbR').length).toEqual(1);
  });
});

