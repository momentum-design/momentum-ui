import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IconModule,
  InputContainerModule,
  InputMessageModule,
  InputModule,
  InputSectionModule,
} from '@momentum-ui/angular';
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
    InputContainerModule,
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
