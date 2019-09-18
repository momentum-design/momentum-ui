import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';
import { InputHelperModule } from '../input-helper/input-helper.module';
import { InputMessageModule } from '../input-message/input-message.module';
import { InputSectionModule } from '../input-section/input-section.module';
import { LabelModule } from '../label/label.module';
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
