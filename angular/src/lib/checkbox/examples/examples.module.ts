import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from '../checkbox.module';
import {
  ExampleCheckboxDefaultComponent,
  ExampleCheckboxDisabledComponent,
  ExampleCheckboxIndeterminateComponent,
  ExampleCheckboxNestedComponent,
  ExampleCheckboxKitchenSinkComponent,
} from './index';
import { CheckboxGroupComponent } from 'src/lib/checkbox-group/checkbox-group.component';

@NgModule({
  imports: [CommonModule, CheckboxModule, FormsModule, ReactiveFormsModule],
  exports: [
    ExampleCheckboxDefaultComponent,
    ExampleCheckboxDisabledComponent,
    ExampleCheckboxIndeterminateComponent,
    ExampleCheckboxNestedComponent,
    ExampleCheckboxKitchenSinkComponent,
    CheckboxGroupComponent
  ],
  declarations: [
    ExampleCheckboxDefaultComponent,
    ExampleCheckboxDisabledComponent,
    ExampleCheckboxIndeterminateComponent,
    ExampleCheckboxNestedComponent,
    ExampleCheckboxKitchenSinkComponent,
    CheckboxGroupComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckboxExamplesModule {}
