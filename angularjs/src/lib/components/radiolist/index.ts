import * as angular from 'angular';
import { mdRadiolist } from './radiolist.component';

export default angular
  .module('momentum.ui.radiolist', [])
  .directive('mdRadiolist', mdRadiolist)
  .name;
