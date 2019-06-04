import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { CallControlComponent } from './call-control.component';

@NgModule({
  imports: [CommonModule, ButtonModule, IconModule],
  declarations: [CallControlComponent],
  exports: [CallControlComponent],
})
export class CallControlModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CallControlModule,
      providers: [],
    };
  }
}
