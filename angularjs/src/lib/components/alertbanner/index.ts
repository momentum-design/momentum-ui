import * as angular from 'angular';
import { AlertBannerComponent } from './alertbanner.component';

export default angular
  .module('collab.ui.alertBanner', [])
  .component('csAlertBanner', new AlertBannerComponent())
  .name;
