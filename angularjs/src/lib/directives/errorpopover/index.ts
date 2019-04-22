import * as angular from 'angular';
import {
  mdErrorPopover,
  MdErrorPopoverCtrl,
} from './errorpopover.directive';

export default angular
  .module('momentum.ui.errorpopover', [])
  .directive('errorPopover', mdErrorPopover)
  .controller('MdErrorPopoverCtrl', MdErrorPopoverCtrl)
  .name;
