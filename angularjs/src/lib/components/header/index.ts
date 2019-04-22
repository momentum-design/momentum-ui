import * as angular from 'angular';
import {
  mdHeader,
  mdHeaderLeft,
  mdHeaderRight,
} from './header.component';

export default angular
  .module('momentum.ui.header', [])
  .directive('mdHeader', mdHeader)
  .directive('mdHeaderLeft', mdHeaderLeft)
  .directive('mdHeaderRight', mdHeaderRight)
  .name;
