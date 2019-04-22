import * as angular from 'angular';
import { BindHtmlUnsafeDirective } from './bindHtmlUnsafe.directive';

export default angular
  .module('momentum.ui.bindHtml', [])
  .directive('mdBindHtmlUnsafe', BindHtmlUnsafeDirective.factory())
  .name;
