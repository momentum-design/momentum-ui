import * as angular from 'angular';
import { SpinnerComponent } from './spinner.component';

export default angular
  .module('collab.ui.spinner', [])
  .component('csSpinner', new SpinnerComponent())
  .name;
