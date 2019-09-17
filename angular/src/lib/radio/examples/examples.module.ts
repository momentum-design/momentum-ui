import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioGroupModule, RadioModule } from '@momentum-ui/angular';
import {
  ExampleRadioDefaultComponent,
  ExampleRadioDisabledComponent,
  ExampleRadioKitchenSinkComponent,
  ExampleRadioNestedComponent,
} from './index';

@NgModule({
  imports: [CommonModule, RadioModule, RadioGroupModule, FormsModule, ReactiveFormsModule],
  exports: [
    ExampleRadioDefaultComponent,
    ExampleRadioDisabledComponent,
    ExampleRadioNestedComponent,
    ExampleRadioKitchenSinkComponent,
  ],
  declarations: [
    ExampleRadioDefaultComponent,
    ExampleRadioDisabledComponent,
    ExampleRadioNestedComponent,
    ExampleRadioKitchenSinkComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RadioExamplesModule {}
