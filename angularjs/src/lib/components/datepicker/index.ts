import * as angular from 'angular';
import { DatePickerComponent } from './datepicker.component';
import DropdownModule from '../../services/dropdown';

export default angular
  .module('momentum.ui.datepicker', [
    DropdownModule,
  ])
  .component('mdDatepicker', new DatePickerComponent())
  .name;
