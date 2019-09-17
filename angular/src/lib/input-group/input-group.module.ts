import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon';
import { InputGroupComponent } from './input-group.component';
import { InputHelperModule } from '../input-helper';
import { InputMessageModule } from '../input-message';
import { InputSectionModule } from '../input-section';
import { LabelModule } from '../label';

@NgModule({
  declarations: [InputGroupComponent],
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    InputHelperModule,
    InputMessageModule,
    InputSectionModule,
    LabelModule,
    ReactiveFormsModule,
  ],
  exports: [InputGroupComponent],
})

export class InputGroupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InputGroupModule,
      providers: [],
    };
  }
}
