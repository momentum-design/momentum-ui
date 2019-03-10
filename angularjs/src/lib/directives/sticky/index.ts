import * as angular from 'angular';
import {
  csSticky,
} from './sticky.directive';

export default angular.module('collab.ui.sticky', [])
 .directive('csSticky', csSticky)
 .name;
