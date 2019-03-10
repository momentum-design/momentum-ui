import * as angular from 'angular';
import { csRadiolist } from './radiolist.component';

export default angular
  .module('collab.ui.radiolist', [])
  .directive('csRadiolist', csRadiolist)
  .name;
