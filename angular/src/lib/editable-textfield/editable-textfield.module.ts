import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../input/input.module';
import { EditableTextfieldComponent } from './editable-textfield.component';

@NgModule({
  declarations: [EditableTextfieldComponent],
  imports: [CommonModule, InputModule, FormsModule, ReactiveFormsModule],
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
