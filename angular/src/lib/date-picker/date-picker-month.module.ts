import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerMonthComponent } from './date-picker-month.component';
import { DatePickerWeekModule } from './date-picker-week.module';

@NgModule({
  declarations: [DatePickerMonthComponent],
  imports: [
    CommonModule,
    DatePickerWeekModule
  ],
  exports: [DatePickerMonthComponent]
})
export class DatePickerMonthModule { }
