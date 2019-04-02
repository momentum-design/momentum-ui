import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerDayComponent } from './date-picker-day.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [DatePickerDayComponent],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [DatePickerDayComponent]
})
export class DatePickerDayModule { }
