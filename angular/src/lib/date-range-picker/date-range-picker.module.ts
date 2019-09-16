import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { DateRangePickerComponent } from './date-range-picker.component';
import { DatePickerCalendarModule } from '../date-picker/date-picker-calendar.module';
import { DateRangeInputModule } from './date-range-input.module';
@NgModule({
  declarations: [DateRangePickerComponent],
  imports: [
    CommonModule,
    OverlayModule,
    DatePickerCalendarModule,
    DateRangeInputModule
  ],
  exports: [DateRangePickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DateRangePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DateRangePickerModule,
      providers: [],
    };
  }
}
