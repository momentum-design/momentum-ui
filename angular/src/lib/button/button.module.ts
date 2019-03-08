import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { LoadingModule } from '../loading';

@NgModule({
  imports: [
    CommonModule,
    LoadingModule.forRoot(),
  ],
  exports: [ButtonComponent],
  declarations: [ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ButtonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ButtonModule,
      providers: [],
    };
  }
}
