import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { InputMessageComponent } from './input-message.component';

@NgModule({
  declarations: [InputMessageComponent],
  imports: [CommonModule],
  exports: [InputMessageComponent],
})

export class InputMessageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InputMessageModule,
      providers: [],
    };
  }
}
