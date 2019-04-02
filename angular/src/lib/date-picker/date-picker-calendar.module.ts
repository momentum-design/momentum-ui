import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerCalendarComponent } from './date-picker-calendar.component';
import { DatePickerMonthModule } from './date-picker-month.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [DatePickerCalendarComponent],
  imports: [
    CommonModule,
    DatePickerMonthModule,
    IconModule
  ],
  exports: [DatePickerCalendarComponent]
})
export class DatePickerCalendarModule { }
