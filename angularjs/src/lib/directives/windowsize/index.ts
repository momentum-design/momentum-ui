import * as angular from 'angular';
import { csWindowsize } from './windowsize.directive';

export default angular
  .module('collab.ui.windowsize', [])
  .directive('windowsize', csWindowsize)
  .name;
