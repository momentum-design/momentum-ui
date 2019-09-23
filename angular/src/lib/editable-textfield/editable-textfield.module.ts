import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputContainerModule } from '../input-container/input-container.module';
import { InputModule } from '../input/input.module';
import { EditableTextfieldComponent } from './editable-textfield.component';

@NgModule({
  imports: [
    CommonModule,
    InputContainerModule,
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
