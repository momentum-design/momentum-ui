import * as angular from 'angular';
import {
  mdLeftNav,
  mdSubNav,
} from './leftnav.component';

export default angular
  .module('momentum.ui.leftnav', [])
  .directive('mdLeftNav', mdLeftNav)
  .directive('mdSubNav', mdSubNav)
  .name;
