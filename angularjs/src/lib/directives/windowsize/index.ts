import * as angular from 'angular';
import { mdWindowsize } from './windowsize.directive';

export default angular
  .module('momentum.ui.windowsize', [])
  .directive('windowsize', mdWindowsize)
  .name;
