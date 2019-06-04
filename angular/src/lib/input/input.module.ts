import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { LabelModule } from '../label/label.module';
import { InputErrorModule } from '../input-error/input-error.module';
import { InputHelperModule } from '../input-helper/input-helper.module';
import { IconModule } from '../icon/icon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LabelModule,
    InputErrorModule,
    InputHelperModule,
    IconModule,
  ],
  exports: [InputComponent],
})
export class InputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InputModule,
      providers: [],
    };
  }
}
