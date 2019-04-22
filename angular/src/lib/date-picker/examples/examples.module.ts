import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePickerModule } from '@momentum-ui/angular';

import { ExampleDatePickerDefaultComponent } from './index';

@NgModule({
  imports: [
    DatePickerModule
  ],
  exports: [
    ExampleDatePickerDefaultComponent
  ],
  declarations: [
    ExampleDatePickerDefaultComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DatePickerExamplesModule { }
