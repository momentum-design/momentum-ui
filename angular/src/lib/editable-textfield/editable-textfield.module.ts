import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditableTextfieldComponent } from './editable-textfield.component';
import { InputGroupModule } from '../input-group';
import { InputModule } from '../input';

@NgModule({
  imports: [
    CommonModule,
    InputGroupModule,
    InputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EditableTextfieldComponent],
  exports: [EditableTextfieldComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditableTextfieldModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EditableTextfieldModule,
      providers: [],
    };
  }
}
