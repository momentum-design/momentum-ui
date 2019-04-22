import * as angular from 'angular';
import mdTooltip from '../tooltip';
import {
  popover,
  popoverTemplatePopup,
  popoverTemplate,
  popoverHtmlPopup,
  popoverHtml,
  popoverPopup,
} from './popover.directive';

export default angular
  .module('momentum.ui.popover', [
    mdTooltip,
  ])
  .directive('popover', popover)
  .directive('popoverTemplatePopup', popoverTemplatePopup)
  .directive('popoverTemplate', popoverTemplate)
  .directive('popoverHtmlPopup', popoverHtmlPopup)
  .directive('popoverHtml', popoverHtml)
  .directive('popoverPopup', popoverPopup)
  .name;
