import * as angular from 'angular';
import { DateRangePickerCalendarComponent } from './daterangepicker-calendar.component';
import { DateRangePickerComponent } from './daterangepicker.component';

export default angular
  .module('momentum.ui.daterangepicker', [
  ])
  .component('mdDateRangePickerCalendar', new DateRangePickerCalendarComponent())
  .component('mdDateRangePicker', new DateRangePickerComponent())
  .name;
