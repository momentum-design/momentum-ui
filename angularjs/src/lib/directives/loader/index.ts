import * as angular from 'angular';
import { mdLoader } from './loader.directive';

export default angular
  .module('momentum.ui.loader', [])
  .directive('mdLoader', mdLoader)
  .name;
