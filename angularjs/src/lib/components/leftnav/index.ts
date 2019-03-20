import * as angular from 'angular';
import {
  csLeftNav,
  csSubNav,
} from './leftnav.component';

export default angular
  .module('collab.ui.leftnav', [])
  .directive('csLeftNav', csLeftNav)
  .directive('csSubNav', csSubNav)
  .name;
