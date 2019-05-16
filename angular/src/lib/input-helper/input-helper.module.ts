import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputHelperComponent } from './input-helper.component';

@NgModule({
  declarations: [InputHelperComponent],
  imports: [CommonModule],
  exports: [InputHelperComponent],
})
export class InputHelperModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InputHelperModule,
      providers: [],
    };
  }
}
