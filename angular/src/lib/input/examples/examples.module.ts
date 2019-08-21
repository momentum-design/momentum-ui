import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../input.module';
import { CommonModule } from '@angular/common';

import {
  ExampleInputDefaultComponent,
  ExampleInputErrorComponent,
  ExampleInputWarningComponent,
  ExampleInputSuccessComponent,
  ExampleInputDisabledComponent,
  ExampleInputReadOnlyComponent,
  ExampleInputHelpTextComponent,
  ExampleInputSecondaryLabelComponent,
  ExampleInputClearComponent,
} from './index';

@NgModule({
  imports: [InputModule, FormsModule, ReactiveFormsModule, CommonModule],
  exports: [
    ExampleInputDefaultComponent,
    ExampleInputErrorComponent,
    ExampleInputWarningComponent,
    ExampleInputSuccessComponent,
    ExampleInputDisabledComponent,
    ExampleInputReadOnlyComponent,
    ExampleInputHelpTextComponent,
    ExampleInputSecondaryLabelComponent,
    ExampleInputClearComponent,
  ],
  declarations: [
    ExampleInputDefaultComponent,
    ExampleInputErrorComponent,
    ExampleInputWarningComponent,
    ExampleInputSuccessComponent,
    ExampleInputDisabledComponent,
    ExampleInputReadOnlyComponent,
    ExampleInputHelpTextComponent,
    ExampleInputSecondaryLabelComponent,
    ExampleInputClearComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputExamplesModule {}
