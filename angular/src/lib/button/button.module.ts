import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { LoadingModule } from '../loading';

@NgModule({
  imports: [CommonModule, LoadingModule.forRoot()],
  exports: [ButtonComponent],
  declarations: [ButtonComponent],
})
export class ButtonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ButtonModule,
      providers: [],
    };
  }
}
