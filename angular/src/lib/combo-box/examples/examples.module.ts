import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ComboBoxModule,
} from '@momentum-ui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExampleComboBoxDefaultComponent, ExampleComboBoxClearComponent, ExampleComboBoxMiscComponent, ExampleComboBoxErrorsComponent } from './index';
import { InputMessageModule } from 'src/lib/input-message/input-message.module';
import { InputContainerModule } from 'src/lib/input-container/input-container.module';

@NgModule({
  imports: [
    CommonModule,
    ComboBoxModule,
    FormsModule,
    ReactiveFormsModule,
    InputContainerModule,
    InputMessageModule,
  ],
  declarations: [
    ExampleComboBoxDefaultComponent,
    ExampleComboBoxClearComponent,
    ExampleComboBoxMiscComponent,
    ExampleComboBoxErrorsComponent
  ],
  exports: [
    ExampleComboBoxDefaultComponent,
    ExampleComboBoxClearComponent,
    ExampleComboBoxMiscComponent,
    ExampleComboBoxErrorsComponent
  ],
})
export class ComboBoxExamplesModule {}
