import { shallowMount } from '@vue/test-utils';
import Card from '../index.vue';
import CardSection from '../../card-section/index.vue';
import Vue from 'vue';

Vue.component(CardSection.name, CardSection);

describe('Card', () => {
  it('should match snapshot', () => {
    const container = shallowMount(Card);
    expect(container.html()).toMatchSnapshot();
  });

  it('should render one Card', () => {
    const container = shallowMount(Card);

    expect(container.findAll('.md-card').length).toEqual(1);
  });

  it('should render one Clickable Card', () => {
    const container = shallowMount(Card, {
      listeners: {
        click: () => {}
      }
    });

    expect(container.findAll('.md-card--clickable').length).toEqual(1);
  });

  it('should handle onClick event', () => {
    let clicked = false;
    const clicker = () => {
      clicked = true;
    };
    const container = shallowMount(Card, {
      listeners: {
        click: clicker
      }
    });

    container.find('.md-card--clickable').trigger('click');
    expect(clicked).toEqual(true);
  });

  it('should render a Card with the given classes', () => {
    const container = shallowMount(Card, {
      attrs: {
        class: 'testing-class'
      }
    });

    expect(container.classes('testing-class')).toEqual(true);
  });

  it('should render children', () => {
    const container = shallowMount(Card, {
      slots: {
        default: `<div class="testingforMB" />`
      }
    });

    expect(container.findAll('.testingforMB').length).toEqual(1);
  });
});

