import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputHelperModule } from '../input-helper/input-helper.module';
import { RadioComponent } from './radio.component';

@NgModule({
  declarations: [RadioComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputHelperModule],
  exports: [RadioComponent],
})
export class RadioModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RadioModule,
      providers: [],
    };
  }
}
