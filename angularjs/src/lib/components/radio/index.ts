import * as angular from 'angular';
import { csRadio } from './radio.component';

export default angular
  .module('collab.ui.radio', [])
  .directive('csRadio', csRadio)
  .name;
