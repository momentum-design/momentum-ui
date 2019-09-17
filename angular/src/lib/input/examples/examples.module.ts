import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IconModule,
  InputGroupModule,
  InputMessageModule,
  InputModule,
  InputSectionModule,
} from '@momentum-ui/angular';

import { CommonModule } from '@angular/common';

import {
  ExampleInputClearComponent,
  ExampleInputDefaultComponent,
  ExampleInputDisabledComponent,
  ExampleInputErrorComponent,
  ExampleInputHelpTextComponent,
  ExampleInputKitchenSinkComponent,
  ExampleInputReadOnlyComponent,
  ExampleInputSecondaryLabelComponent,
  ExampleInputSuccessComponent,
  ExampleInputWarningComponent,
} from './index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    InputGroupModule,
    InputMessageModule,
    InputModule,
    InputSectionModule,
    ReactiveFormsModule,
  ],
  exports: [
    ExampleInputClearComponent,
    ExampleInputDefaultComponent,
    ExampleInputDisabledComponent,
    ExampleInputErrorComponent,
    ExampleInputHelpTextComponent,
    ExampleInputKitchenSinkComponent,
    ExampleInputReadOnlyComponent,
    ExampleInputSecondaryLabelComponent,
    ExampleInputSuccessComponent,
    ExampleInputWarningComponent,
  ],
  declarations: [
    ExampleInputClearComponent,
    ExampleInputDefaultComponent,
    ExampleInputDisabledComponent,
    ExampleInputErrorComponent,
    ExampleInputHelpTextComponent,
    ExampleInputKitchenSinkComponent,
    ExampleInputReadOnlyComponent,
    ExampleInputSecondaryLabelComponent,
    ExampleInputSuccessComponent,
    ExampleInputWarningComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class InputExamplesModule {}
