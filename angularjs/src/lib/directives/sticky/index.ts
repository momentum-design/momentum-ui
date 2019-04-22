import * as angular from 'angular';
import {
  mdSticky,
} from './sticky.directive';

export default angular.module('momentum.ui.sticky', [])
 .directive('mdSticky', mdSticky)
 .name;
