import { shallowMount } from '@vue/test-utils';
import Spinner from '../index.vue';

describe('Spinner', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(Spinner);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render with correct class names', () => {
    const wrapper = shallowMount(Spinner);

    expect(wrapper.find('i').classes('md-spinner')).toEqual(true);
  });

  it('should render with color class name', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        color: 'blue'
      }
    });

    expect(wrapper.find('i').classes('md-spinner--blue')).toEqual(true);
  });

  it('should render with size class name', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        size: 28
      }
    });

    expect(wrapper.find('i').classes('md-spinner--28')).toEqual(true);
  });

  it('should render with color and size class name', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        color: 'blue',
        size: 36,
      }
    });

    expect(wrapper.find('i').classes('md-spinner--blue')).toEqual(true);
    expect(wrapper.find('i').classes('md-spinner--36')).toEqual(true);
  });

  it('should render progress with size class name', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        percentage: 55,
        size: 36,
      }
    });

    expect(wrapper.find('.md-spinner-progress').classes('md-spinner-progress--36')).toEqual(true);
  });

  it('should render progress with color and size class name', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        color: 'blue',
        percentage: 55,
        size: 36,
      }
    });

    expect(wrapper.find('.md-spinner-progress').classes('md-spinner-progress--36')).toEqual(true);
    expect(wrapper.find('.md-spinner-progress').classes('md-spinner-progress--blue')).toEqual(true);
  });

  it('should render progress with color and size class name with percentage', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        color: 'blue',
        percentage: 55,
        size: 36,
        showPercentage: true
      }
    });

    expect(wrapper.find('.md-spinner-progress').classes('md-spinner-progress--36')).toEqual(true);
    expect(wrapper.find('.md-spinner-progress').classes('md-spinner-progress--blue')).toEqual(true);
    expect(wrapper.findAll('.md-spinner-progress__percentage').length).toEqual(1);
  });

  it('should render progress with color and size class name with no percentage', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        color: 'blue',
        percentage: 55,
        size: 36,
        showPercentage: false
      }
    });

    expect(wrapper.find('.md-spinner-progress').classes('md-spinner-progress--36')).toEqual(true);
    expect(wrapper.find('.md-spinner-progress').classes('md-spinner-progress--blue')).toEqual(true);
    expect(wrapper.findAll('.md-spinner-progress__percentage').length).toEqual(0);
  });

  it('should warn with showProgress but size set to anything but 36', () => {
    global.console = {warn: jest.fn()};
    const wrapper = shallowMount(Spinner, {
      propsData: {
        color: 'blue',
        percentage: 55,
        size: 16,
        showPercentage: true
      }
    });

    expect(wrapper.find('.md-spinner-progress').classes('md-spinner-progress--16')).toEqual(true);
    expect(global.console.warn).toHaveBeenCalledTimes(1);
  });

  it('should render with showCheck and check class name with 100 percentage', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        percentage: 100,
        showCheck: true
      }
    });

    expect(wrapper.find('.md-spinner-progress__inset-circle').classes('md-spinner-progress__inset-circle--check')).toEqual(true);
  });

  it('should not render check if percentage is less than 100 with showCheck', () => {
    const wrapper = shallowMount(Spinner, {
      propsData: {
        percentage: 90,
        showCheck: true
      }
    });

    expect(wrapper.find('.md-spinner-progress__inset-circle').classes('md-spinner-progress__inset-circle--check')).toEqual(false);
  });

});
