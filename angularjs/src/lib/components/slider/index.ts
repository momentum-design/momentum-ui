import * as angular from 'angular';
import {
  mdSlider,
  throttle,
  SliderFactory,
} from  './slider.component';

export default angular
  .module('momentum.ui.slider', [])
  .value('throttle', throttle)
  .factory('SliderFactory', SliderFactory)
  .directive('mdSlider', mdSlider)
  .name;
