import * as angular from 'angular';
import { AlertBannerComponent } from './alertbanner.component';

export default angular
  .module('momentum.ui.alertBanner', [])
  .component('mdAlertBanner', new AlertBannerComponent())
  .name;
