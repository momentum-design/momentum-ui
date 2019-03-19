import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerWeekComponent } from './date-picker-week.component';
import { DatePickerDayModule } from './date-picker-day.module';

@NgModule({
  declarations: [DatePickerWeekComponent],
  imports: [
    CommonModule,
    DatePickerDayModule
  ],
  exports: [DatePickerWeekComponent]
})
export class DatePickerWeekModule { }
