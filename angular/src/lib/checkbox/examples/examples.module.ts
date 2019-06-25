import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckboxModule } from '../checkbox.module';

import {
  ExampleCheckboxDefaultComponent,
  ExampleCheckboxDisabledComponent,
  ExampleCheckboxIndeterminateComponent,
  ExampleCheckboxNestedComponent,
} from './index';
import { CheckboxGroupComponent } from 'src/lib/checkbox-group/checkbox-group.component';



@NgModule({
  imports: [CheckboxModule, FormsModule, ReactiveFormsModule],
  exports: [
    ExampleCheckboxDefaultComponent,
    ExampleCheckboxDisabledComponent,
    ExampleCheckboxIndeterminateComponent,
    ExampleCheckboxNestedComponent,
    CheckboxGroupComponent
  ],
  declarations: [
    ExampleCheckboxDefaultComponent,
    ExampleCheckboxDisabledComponent,
    ExampleCheckboxIndeterminateComponent,
    ExampleCheckboxNestedComponent,
    CheckboxGroupComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckboxExamplesModule {}
