import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ComboBoxModule,
} from '@momentum-ui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExampleComboBoxDefaultComponent, ExampleComboBoxClearComponent, ExampleComboBoxMiscComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    ComboBoxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ExampleComboBoxDefaultComponent, ExampleComboBoxClearComponent, ExampleComboBoxMiscComponent],
  exports: [ExampleComboBoxDefaultComponent, ExampleComboBoxClearComponent, ExampleComboBoxMiscComponent],
})
export class ComboBoxExamplesModule {}
