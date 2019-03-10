import * as angular from 'angular';
import * as ngMessages from 'angular-messages';
import { csTimepicker } from './timepicker.directive';

export default angular
  .module('collab.ui.timepicker', [
    ngMessages || 'ngMessages',
  ])
  .directive('csTimepicker', csTimepicker)
  .name;
