import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioGroupModule, RadioModule } from '@momentum-ui/angular';
import {
  ExampleRadioDefaultComponent,
  ExampleRadioDisabledComponent,
  ExampleRadioNestedComponent,
} from './index';

@NgModule({
  imports: [RadioModule, RadioGroupModule, FormsModule, ReactiveFormsModule],
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RadioExamplesModule {}
