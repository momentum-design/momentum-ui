import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from '../label';
import { InputHelperModule } from '../input-helper';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LabelModule,
    InputHelperModule,
  ],
  exports: [CheckboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckboxModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CheckboxModule,
      providers: [],
    };
  }
}
