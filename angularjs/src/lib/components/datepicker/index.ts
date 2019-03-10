import * as angular from 'angular';
import { DatePickerComponent } from './datepicker.component';
import DropdownModule from '../../services/dropdown';

export default angular
  .module('collab.ui.datepicker', [
    DropdownModule,
  ])
  .component('csDatepicker', new DatePickerComponent())
  .name;
