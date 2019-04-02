import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker.component';
import { DatePickerCalendarModule } from './date-picker-calendar.module';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [DatePickerComponent],
  imports: [
    CommonModule,
    OverlayModule,
    DatePickerCalendarModule
  ],
  exports: [DatePickerComponent]
})
export class DatePickerModule { }
