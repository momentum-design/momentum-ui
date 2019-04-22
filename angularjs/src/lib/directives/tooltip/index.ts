import * as angular from 'angular';
import {
  tooltip,
  tooltipHtmlUnsafe,
  tooltipClasses,
  tooltipPopup,
  tooltipTemplateTransclude,
  tooltipTemplate,
  tooltipHtmlUnsafePopup,
  tooltipHtmlPopup,
  tooltipHtml,
  tooltipTemplatePopup,
  $tooltip,
} from './tooltip.directive';

export * from './tooltip.directive';

export default angular.module('momentum.ui.tooltip', [])
  .directive('tooltip', tooltip)
  .directive('tooltipHtmlUnsafe', tooltipHtmlUnsafe)
  .directive('tooltipClasses', tooltipClasses)
  .directive('tooltipPopup', tooltipPopup)
  .directive('tooltipTemplateTransclude', tooltipTemplateTransclude)
  .directive('tooltipTemplate', tooltipTemplate)
  .directive('tooltipHtmlUnsafePopup', tooltipHtmlUnsafePopup)
  .directive('tooltipHtmlPopup', tooltipHtmlPopup)
  .directive('tooltipHtml', tooltipHtml)
  .directive('tooltipTemplatePopup', tooltipTemplatePopup)
  .provider('$tooltip', $tooltip)
  .name;
