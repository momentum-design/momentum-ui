import * as angular from 'angular';
import csTooltip from '../tooltip';
import {
  popover,
  popoverTemplatePopup,
  popoverTemplate,
  popoverHtmlPopup,
  popoverHtml,
  popoverPopup,
} from './popover.directive';

export default angular
  .module('collab.ui.popover', [
    csTooltip,
  ])
  .directive('popover', popover)
  .directive('popoverTemplatePopup', popoverTemplatePopup)
  .directive('popoverTemplate', popoverTemplate)
  .directive('popoverHtmlPopup', popoverHtmlPopup)
  .directive('popoverHtml', popoverHtml)
  .directive('popoverPopup', popoverPopup)
  .name;
