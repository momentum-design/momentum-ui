import * as angular from 'angular';
import { mdRadio } from './radio.component';

export default angular
  .module('momentum.ui.radio', [])
  .directive('mdRadio', mdRadio)
  .name;
