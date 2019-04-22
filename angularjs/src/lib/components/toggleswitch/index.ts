import * as angular from 'angular';
import { mdToggleSwitch } from './toggleswitch.component';

export default angular
  .module('momentum.ui.toggleswitch', [])
  .directive('mdToggleSwitch', mdToggleSwitch)
  .name;
