import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeInputComponent } from './date-range-input.component';


@NgModule({
  declarations: [DateRangeInputComponent],
  imports: [
    CommonModule
  ],
  exports: [DateRangeInputComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DateRangeInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DateRangeInputModule,
      providers: [],
    };
  }
}
