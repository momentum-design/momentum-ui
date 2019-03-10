import * as angular from 'angular';
import { TopbarComponent } from './topbar.component';

export default angular
  .module('collab.ui.topbar', [])
  .component('csTopBar', new TopbarComponent())
  .name;
