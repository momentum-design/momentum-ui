import * as angular from 'angular';
import { csToggleSwitch } from './toggleswitch.component';

export default angular
  .module('collab.ui.toggleswitch', [])
  .directive('csToggleSwitch', csToggleSwitch)
  .name;
