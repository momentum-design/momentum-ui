import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangePickerModule } from '@momentum-ui/angular';
import { DateRangePickerDefaultComponent } from './date-range-picker-default.component';

@NgModule({
  imports: [
    CommonModule,
    DateRangePickerModule
  ],
  declarations: [DateRangePickerDefaultComponent],
  exports: [DateRangePickerDefaultComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DateRangePickerExamplesModule { }
