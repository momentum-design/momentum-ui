import * as angular from 'angular';
import { TopNavComponent } from './topnav.component';

export default angular
  .module('momentum.ui.topnav', [])
  .component('mdTopNav', new TopNavComponent())
  .name;
