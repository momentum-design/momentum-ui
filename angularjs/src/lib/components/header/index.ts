import * as angular from 'angular';
import {
  csHeader,
  csHeaderLeft,
  csHeaderRight,
} from './header.component';

export default angular
  .module('collab.ui.header', [])
  .directive('csHeader', csHeader)
  .directive('csHeaderLeft', csHeaderLeft)
  .directive('csHeaderRight', csHeaderRight)
  .name;
