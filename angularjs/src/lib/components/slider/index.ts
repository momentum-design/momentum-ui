import * as angular from 'angular';
import {
  csSlider,
  throttle,
  SliderFactory,
} from  './slider.component';

export default angular
  .module('collab.ui.slider', [])
  .value('throttle', throttle)
  .factory('SliderFactory', SliderFactory)
  .directive('csSlider', csSlider)
  .name;
