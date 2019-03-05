import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputModule } from '@collab-ui/angular';
import {
  ExampleInputDefaultComponent,
  ExampleInputErrorComponent,
  ExampleInputWarningComponent,
  ExampleInputSuccessComponent,
  ExampleInputDisabledComponent,
  ExampleInputReadOnlyComponent,
  ExampleInputHelpTextComponent,
  ExampleInputSecondaryLabelComponent
} from './index';

@NgModule({
  imports: [
    InputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ExampleInputDefaultComponent,
    ExampleInputErrorComponent,
    ExampleInputWarningComponent,
    ExampleInputSuccessComponent,
    ExampleInputDisabledComponent,
    ExampleInputReadOnlyComponent,
    ExampleInputHelpTextComponent,
    ExampleInputSecondaryLabelComponent
  ],
  declarations: [
    ExampleInputDefaultComponent,
    ExampleInputErrorComponent,
    ExampleInputWarningComponent,
    ExampleInputSuccessComponent,
    ExampleInputDisabledComponent,
    ExampleInputReadOnlyComponent,
    ExampleInputHelpTextComponent,
    ExampleInputSecondaryLabelComponent

  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class InputExamplesModule { }
