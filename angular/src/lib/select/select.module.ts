import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SelectComponent,
  SelectItemComponent,
  SelectCheckboxComponent
} from './select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from '../icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IconModule,
  ],
  exports: [
    SelectComponent,
    SelectItemComponent,
    SelectCheckboxComponent
  ],
  declarations: [
    SelectComponent,
    SelectItemComponent,
    SelectCheckboxComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SelectModule { }
