import { shallowMount } from '@vue/test-utils';
import ToggleSwitch from '../index.vue';

describe('ToggleSwitch', () => {
  it('should match snapshot', () => {
    const container = shallowMount(ToggleSwitch, {
      propsData: {
        label: 'test',
        htmlId: 'test123'
      }
    });
    expect(container.html()).toMatchSnapshot();
  });

  it('should render one ToggleSwitch', () => {
    const container = shallowMount(ToggleSwitch, {
      propsData: {
        label: 'test',
        htmlId: 'test123'
      }
    });

    expect(container.findAll('input').length).toEqual(1);
  });

  it('should render label with two child spans', () => {
    const container = shallowMount(ToggleSwitch, {
      propsData: {
        label: 'test',
        htmlId: 'test123'
      }
    });

    expect(container.findAll('label').length).toEqual(1);
    expect(container.find('label').findAll('span').length).toEqual(2);
  });


  it('should handle disabled state', () => {
    const container = shallowMount(ToggleSwitch, {
      propsData: {
        label: 'test',
        htmlId: 'test123',
        disabled: true
      }
    });

    expect(container.find('input').attributes().disabled).toEqual('disabled');
  });

  it('should handle onChange event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = shallowMount(ToggleSwitch, {
      propsData: {
        label: 'test',
        htmlId: 'test123'
      },
      listeners: {
        change: countUp
      }
    });

    container.find('input').trigger('change');
    expect(count).toEqual(1);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = shallowMount(ToggleSwitch, {
      propsData: {
        label: 'test',
        htmlId: 'test123'
      },
      listeners: {
        change: countUp
      }
    });

    container.find('input').trigger('click');
    expect(count).toEqual(1);
  });
});

