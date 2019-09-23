import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';
import { InputContainerModule } from '../input-container/input-container.module';
import { InputSectionModule } from '../input-section/input-section.module';
import { InputModule } from '../input/input.module';
import { ListItemHeaderModule } from '../list-item-header/list-item-header.module';
import { ListItemModule } from '../list-item/list-item.module';
import { ComboBoxComponent } from './combo-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    InputContainerModule,
    InputModule,
    InputSectionModule,
    ListItemHeaderModule,
    ListItemModule,
    OverlayModule,
    ReactiveFormsModule,
  ],
  declarations: [ComboBoxComponent],
  exports: [ComboBoxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ComboBoxModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComboBoxModule,
      providers: [],
    };
  }
}
