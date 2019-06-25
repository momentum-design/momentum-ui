import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxGroupComponent } from './checkbox-group.component';

@NgModule({
  declarations: [CheckboxGroupComponent],
  imports: [
    CommonModule
  ],
  exports: [CheckboxGroupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckboxGroupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CheckboxGroupModule,
      providers: [],
    };
  }
}
