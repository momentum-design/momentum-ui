import * as angular from 'angular';
import * as ngMessages from 'angular-messages';
import { mdInput } from './input.directive';

export default angular
  .module('momentum.ui.input', [
    ngMessages || 'ngMessages',
  ])
  .directive('mdInput', mdInput)
  .name;
