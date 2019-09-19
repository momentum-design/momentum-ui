import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';
import { InputContainerModule } from '../input-container/input-container.module';
import { InputHelperModule } from '../input-helper/input-helper.module';
import { InputMessageModule } from '../input-message/input-message.module';
import { InputSectionModule } from '../input-section/input-section.module';
import { InputDirective } from '../input/input.directive';
import { InputService } from '../input/input.service';
import { LabelModule } from '../label/label.module';

@NgModule({
  declarations: [InputDirective],
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    InputHelperModule,
    InputContainerModule,
    InputMessageModule,
    InputSectionModule,
    LabelModule,
    ReactiveFormsModule,
  ],
  exports: [
    InputDirective,
    IconModule,
    InputHelperModule,
    InputContainerModule,
    InputMessageModule,
    InputSectionModule,
    LabelModule,
  ],
  providers: [InputService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InputModule,
      providers: [InputService],
    };
  }
}
