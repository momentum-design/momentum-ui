import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RadioModule } from '@collab-ui/angular';
import {
  ExampleRadioDefaultComponent,
  ExampleRadioDisabledComponent,
  ExampleRadioNestedComponent,

} from './index';

@NgModule({
  imports: [
    RadioModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ExampleRadioDefaultComponent,
    ExampleRadioDisabledComponent,
    ExampleRadioNestedComponent,
  ],
  declarations: [
    ExampleRadioDefaultComponent,
    ExampleRadioDisabledComponent,
    ExampleRadioNestedComponent,
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class RadioExamplesModule { }
