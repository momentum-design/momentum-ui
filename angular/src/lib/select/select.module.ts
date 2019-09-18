import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../button/button.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { IconModule } from '../icon/icon.module';
import { InputContainerModule } from '../input-container/input-container.module';
import { InputSectionModule } from '../input-section/input-section.module';
import { InputModule } from '../input/input.module';
import {
  SelectCheckboxComponent,
  SelectComponent,
  SelectItemComponent
} from './select.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    PortalModule,
    OverlayModule,
    A11yModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputContainerModule,
    InputSectionModule,
    InputModule
  ],
  exports: [
    SelectComponent,
    SelectItemComponent,
    SelectCheckboxComponent
  ],
  declarations: [
    SelectComponent,
    SelectItemComponent,
    SelectCheckboxComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SelectModule,
      providers: [],
    };
  }
}
