import * as angular from 'angular';
import {
  csErrorPopover,
  CsErrorPopoverCtrl,
} from './errorpopover.directive';

export default angular
  .module('collab.ui.errorpopover', [])
  .directive('errorPopover', csErrorPopover)
  .controller('CsErrorPopoverCtrl', CsErrorPopoverCtrl)
  .name;
