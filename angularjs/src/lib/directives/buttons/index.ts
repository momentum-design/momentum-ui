import * as angular from 'angular';
import { csBtn } from './button.directive';

export default angular
  .module('collab.ui.buttons', [])
  .directive('csBtn', csBtn)
    .name;
