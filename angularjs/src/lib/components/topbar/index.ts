import * as angular from 'angular';
import { TopbarComponent } from './topbar.component';

export default angular
  .module('momentum.ui.topbar', [])
  .component('mdTopBar', new TopbarComponent())
  .name;
