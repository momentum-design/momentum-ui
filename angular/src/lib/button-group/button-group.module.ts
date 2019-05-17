import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonGroupComponent } from './button-group.component';

@NgModule({
  declarations: [ButtonGroupComponent],
  imports: [CommonModule],
  exports: [ButtonGroupComponent],
})
export class ButtonGroupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ButtonGroupModule,
      providers: [],
    };
  }
}
