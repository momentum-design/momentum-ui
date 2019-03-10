import * as angular from 'angular';
import { csBreakpoint } from './breakpoint.directive';

export * from './breakpoint.directive';

export default angular
  .module('collab.ui.breakpoint', [])
  .directive('csBreakpoint', csBreakpoint)
    .name;
