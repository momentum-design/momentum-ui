import * as angular from 'angular';
import { DateRangePickerExampleComponent } from './daterangepicker-example.component';

export default angular
  .module('momentum.ui.daterangepicker.examples', [
    require('../').default,
  ])
  .component('daterangepickerExample', new DateRangePickerExampleComponent())
  .name;