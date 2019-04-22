import * as angular from 'angular';
import { SpinnerComponent } from './spinner.component';

export default angular
  .module('momentum.ui.spinner', [])
  .component('mdSpinner', new SpinnerComponent())
  .name;
