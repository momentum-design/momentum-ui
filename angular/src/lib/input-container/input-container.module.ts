import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon';
import { InputHelperModule } from '../input-helper';
import { InputMessageModule } from '../input-message';
import { InputSectionModule } from '../input-section';
import { LabelModule } from '../label';
import { InputContainerComponent } from './input-container.component';

@NgModule({
  declarations: [InputContainerComponent],
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
  exports: [InputContainerComponent],
})

export class InputContainerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InputContainerModule,
      providers: [],
    };
  }
}
