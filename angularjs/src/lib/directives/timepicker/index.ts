import * as angular from 'angular';
import * as ngMessages from 'angular-messages';
import { mdTimepicker } from './timepicker.directive';

export default angular
  .module('momentum.ui.timepicker', [
    ngMessages || 'ngMessages',
  ])
  .directive('mdTimepicker', mdTimepicker)
  .name;
