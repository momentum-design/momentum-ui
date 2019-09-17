import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from './input.directive';

@NgModule({
  declarations: [InputDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [InputDirective],
})

export class InputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InputModule,
      providers: [],
    };
  }
}
