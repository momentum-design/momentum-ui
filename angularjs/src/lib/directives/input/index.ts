import * as angular from 'angular';
import * as ngMessages from 'angular-messages';
import { csInput } from './input.directive';

export default angular
  .module('collab.ui.input', [
    ngMessages || 'ngMessages',
  ])
  .directive('csInput', csInput)
  .name;
