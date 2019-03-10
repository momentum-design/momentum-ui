import * as angular from 'angular';
import { TokenField } from './tokenfield.component';

export default angular.module('collab.ui.tokenfield', [])
  .directive('csTokenField', TokenField.factory)
  .name;
