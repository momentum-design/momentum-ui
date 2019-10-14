import { shallowMount } from '@vue/test-utils';
import CardSection from '../index.vue';

describe('CardSection', () => {
  it('should match snapshot', () => {
    const container = shallowMount(CardSection, {
      attrs: {
        id: 'test'
      }
    });
    expect(container.html()).toMatchSnapshot();
  });

  it('should render one CardSection', () => {
    const container = shallowMount(CardSection, {
      attrs: {
        id: 'test'
      }
    });

    expect(container.findAll('.md-card-section').length).toEqual(1);
  });

  it('should render one full CardSection', () => {
    const container = shallowMount(CardSection, {
      propsData: {
        full: true
      }
    });

    expect(container.findAll('.md-card-section--full').length).toEqual(1);
  });

  it('should render a CardSection with the given classes', () => {
    const container = shallowMount(CardSection, {
      attrs: {
        class: 'testing-class'
      }
    });

    expect(container.classes('testing-class')).toEqual(true);
  });

  it('should render children', () => {
    const container = shallowMount(CardSection, {
      slots: {
        default: `<div class="testingforMB" />`
      }
    });

    expect(container.findAll('.testingforMB').length).toEqual(1);
  });
});

