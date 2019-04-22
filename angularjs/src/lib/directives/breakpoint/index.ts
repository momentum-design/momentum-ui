import * as angular from 'angular';
import { mdBreakpoint } from './breakpoint.directive';

export * from './breakpoint.directive';

export default angular
  .module('momentum.ui.breakpoint', [])
  .directive('mdBreakpoint', mdBreakpoint)
    .name;
