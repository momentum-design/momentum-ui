import { mount } from '@vue/test-utils';
import Slider from '../index.vue';
import SliderPointer from '../../slider-pointer/index.vue';
import Vue from 'vue';

Vue.component(SliderPointer.name, SliderPointer);

describe('Slider', () => {
  it('should match snapshot', () => {
    const props = {
			min: 0,
			max: 100,
			value: {
				low: 20,
				high: 40
			}
    };
    
    const container = mount(Slider, {
      propsData: props
    });
    expect(container.html()).toMatchSnapshot();
  });

  it('should render Slider properly', () => {
		const props = {
			min: 0,
			max: 100,
			value: {
				low: 20,
				high: 40
			}
		};
		const container = mount(Slider, {
      propsData: props
    });

		expect(container.findAll('.md-slider__pointer').length).toEqual(2);
		expect(container.findAll('.md-slider__bar').length).toEqual(1);
		expect(container.findAll('.md-slider__selection').length).toEqual(1);
		expect(container.vm.sliderHigh).toEqual(40);
		expect(container.vm.sliderLow).toEqual(20);
	});

	it('when slider moves and attempts to cross over', () => {
    const changeFunc = jest.fn();
		const props = {
			min: 0,
			max: 100,
			value: {
				low: 10,
				high: 40
			},
			canCross: true
		};

		const container = mount(Slider, {
      propsData: props,
      listeners: {
        change: changeFunc,
      }
    });
		container.vm.getSliderWidth = () => 100;
		container.vm.onSliderMove('sliderLow', {
			from: 10,
			to: 70,
			direction: 1
		});
		expect(container.vm.sliderLow).toEqual(70);
		expect(container.vm.sliderHigh).toEqual(40);
		expect(changeFunc).toHaveBeenCalledWith({low: 40, high: 70});
	});

	it('when slider moves and does not cross over', () => {
    const changeFunc = jest.fn();
		const props = {
			min: 0,
			max: 100,
			value: {
				low: 10,
				high: 40
			},
		};
		const container = mount(Slider, {
      propsData: props,
      listeners: {
        change: changeFunc,
      }
    });
		container.vm.getSliderWidth = () => 100;
		container.vm.onSliderMove('sliderLow', {
			from: 10,
			to: 70,
			direction: 1
		});
		expect(container.vm.sliderLow).toEqual(40);
		expect(container.vm.sliderHigh).toEqual(40);
		expect(changeFunc).toHaveBeenCalledWith({low: 40, high: 40});
	});

	it('when slider stops at boundaries',  () => {
    const changeFunc = jest.fn();
		const props = {
			min: 0,
			max: 100,
			value: {
				low: 10,
				high: 40
			},
		};
		const container = mount(Slider, {
      propsData: props,
      listeners: {
        change: changeFunc,
      }
    });
		container.vm.getSliderWidth = () => 100;

		// moving in forward direction
		container.vm.onSliderMove('sliderHigh', {
			from: 40,
			to: 110,
			direction: 1
		});
		expect(container.vm.sliderHigh).toEqual(100);
		expect(changeFunc).toHaveBeenCalledWith({low: 10, high: 100});

		// moving in backward direction
		container.vm.onSliderMove('sliderLow', {
			from: 10,
			to: -20,
			direction: -1
		});
		expect(container.vm.sliderLow).toEqual(0);
		expect(changeFunc).toHaveBeenCalledWith({low: 0, high: 100});
	});

	it('on keyboard events', () => {
    const changeFunc = jest.fn();
		const props = {
			min: 0,
			max: 100,
			value: {
				low: 10,
				high: 40
			},
		};

		const container = mount(Slider, {
      propsData: props,
      listeners: {
        change: changeFunc,
      }
    });
		container.vm.getSliderWidth = () => 100;

		// left
		container.findAll('.md-slider__pointer').at(1).trigger('keydown', { charCode: 37});
		expect(container.vm.sliderHigh).toEqual(39);

		// right
		container.findAll('.md-slider__pointer').at(1).trigger('keydown', { charCode: 39});
		expect(container.vm.sliderHigh).toEqual(40);

		// up
		container.findAll('.md-slider__pointer').at(1).trigger('keydown', { charCode: 38});
		expect(container.vm.sliderHigh).toEqual(41);

		// down
		container.findAll('.md-slider__pointer').at(1).trigger('keydown', { charCode: 40});
		expect(container.vm.sliderHigh).toEqual(40);


	});

	it('when only one sliderPointer is present', () => {
    const changeFunc = jest.fn();
		const props = {
			min: 20,
			max: 100,
			value: 40,
		};
		const container = mount(Slider, {
      propsData: props,
      listeners: {
        change: changeFunc,
      }
    });
		container.vm.getSliderWidth = () => 100;
		expect(container.findAll('.md-slider__pointer').length).toEqual(1);
		expect(container.findAll('.md-slider__bar').length).toEqual(1);
		expect(container.findAll('.md-slider__selection').length).toEqual(1);

		expect(container.vm.sliderHigh).toEqual(40);
		expect(container.vm.sliderLow).toEqual(20);

		// left
		container.findAll('.md-slider__pointer').at(0).trigger('keydown', { charCode: 37});
		expect(container.vm.sliderHigh).toEqual(39);

		expect(changeFunc).toHaveBeenCalledWith(39);
	});
});

