import * as angular from 'angular';
import { TopNavComponent } from './topnav.component';

export default angular
  .module('collab.ui.topnav', [])
  .component('csTopNav', new TopNavComponent())
  .name;
