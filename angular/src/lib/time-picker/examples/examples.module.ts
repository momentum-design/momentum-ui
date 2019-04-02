import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TimePickerModule } from '@collab-ui/angular';

import { ExampleTimePickerDefaultComponent, ExampleTimePickerMinuteIntervalComponent } from './index';

@NgModule({
  imports: [
    TimePickerModule
  ],
  exports: [
    ExampleTimePickerDefaultComponent,
    ExampleTimePickerMinuteIntervalComponent
  ],
  declarations: [
    ExampleTimePickerDefaultComponent,
    ExampleTimePickerMinuteIntervalComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TimePickerExamplesModule { }
