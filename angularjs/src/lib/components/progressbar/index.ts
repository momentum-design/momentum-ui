import * as angular from 'angular';
import {
  progressbar,
  progress,
  bar,
  progressController,
} from './progressbar.component';

export default angular.module('collab.ui.progressbar', [])
  .constant('progressConfig', {
    animate: true,
    max: 100,
  })
  .controller('progressController', progressController)
  .directive('progress', progress)
  .directive('bar', bar)
  .directive('progressbar', progressbar)
  .name;
