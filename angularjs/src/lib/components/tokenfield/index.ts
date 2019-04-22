import * as angular from 'angular';
import { TokenField } from './tokenfield.component';

export default angular.module('momentum.ui.tokenfield', [])
  .directive('mdTokenField', TokenField.factory)
  .name;
