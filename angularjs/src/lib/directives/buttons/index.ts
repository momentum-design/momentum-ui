import * as angular from 'angular';
import { mdBtn } from './button.directive';

export default angular
  .module('momentum.ui.buttons', [])
  .directive('mdBtn', mdBtn)
    .name;
