import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RadioModule } from '@momentum-ui/angular';
import {
  ExampleRadioDefaultComponent,
  ExampleRadioDisabledComponent,
  ExampleRadioNestedComponent,
} from './index';
import { RadioGroupComponent } from 'src/lib/radio-group';

@NgModule({
  imports: [RadioModule, FormsModule, ReactiveFormsModule],
  exports: [
    ExampleRadioDefaultComponent,
    ExampleRadioDisabledComponent,
    ExampleRadioNestedComponent,
    RadioGroupComponent
  ],
  declarations: [
    ExampleRadioDefaultComponent,
    ExampleRadioDisabledComponent,
    ExampleRadioNestedComponent,
    RadioGroupComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RadioExamplesModule {}
