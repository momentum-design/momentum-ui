import * as angular from 'angular';
import { tokenFieldFactory } from './tokenfield.component';

export default angular.module('momentum.ui.tokenfield', [])
  .directive('mdTokenField', tokenFieldFactory)
  .name;
