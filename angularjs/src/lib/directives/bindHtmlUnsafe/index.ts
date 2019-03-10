import * as angular from 'angular';
import { BindHtmlUnsafeDirective } from './bindHtmlUnsafe.directive';

export default angular
  .module('collab.ui.bindHtml', [])
  .directive('csBindHtmlUnsafe', BindHtmlUnsafeDirective.factory())
  .name;
