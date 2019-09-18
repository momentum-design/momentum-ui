import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SelectComponent,
  SelectItemComponent,
  SelectCheckboxComponent
} from './select.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { InputGroupModule } from '../input-group/input-group.module';
import { InputModule } from '../input/input.module';
import { InputSectionModule } from '../input-section/input-section.module';

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
    InputGroupModule,
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
