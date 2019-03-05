import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxModule } from '@collab-ui/angular';
import {
  ExampleCheckboxDefaultComponent,
  ExampleCheckboxDisabledComponent,
  ExampleCheckboxIndeterminateComponent,
  ExampleCheckboxNestedComponent,

} from './index';

@NgModule({
  imports: [
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ExampleCheckboxDefaultComponent,
    ExampleCheckboxDisabledComponent,
    ExampleCheckboxIndeterminateComponent,
    ExampleCheckboxNestedComponent,

  ],
  declarations: [
    ExampleCheckboxDefaultComponent,
    ExampleCheckboxDisabledComponent,
    ExampleCheckboxIndeterminateComponent,
    ExampleCheckboxNestedComponent,

  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CheckboxExamplesModule { }
