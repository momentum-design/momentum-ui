import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableTextfieldDefaultComponent } from './editable-textfield-default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditableTextfieldModule } from '@momentum-ui/angular';

@NgModule({
  imports: [
    CommonModule,
    EditableTextfieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [EditableTextfieldDefaultComponent],
  declarations: [EditableTextfieldDefaultComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditableTextfieldExamplesModule {}
