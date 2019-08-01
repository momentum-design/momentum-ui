import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from '../select.module';
import {
  SelectDefaultComponent,
  SelectReactiveFormComponent,
  SelectMultiComponent,
  SelectFilterComponent
} from './index';

@NgModule({
  imports: [
    CommonModule,
    SelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SelectDefaultComponent,
    SelectReactiveFormComponent,
    SelectMultiComponent,
    SelectFilterComponent
  ],
  exports: [
    SelectDefaultComponent,
    SelectReactiveFormComponent,
    SelectMultiComponent,
    SelectFilterComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SelectExamplesModule { }
