import * as angular from 'angular';
import { csLoader } from './loader.directive';

export default angular
  .module('collab.ui.loader', [])
  .directive('csLoader', csLoader)
  .name;
