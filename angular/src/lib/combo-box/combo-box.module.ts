import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon';
import { InputModule } from '../input';
import { InputContainerModule } from '../input-container';
import { InputSectionModule } from '../input-section';
import { ListItemModule } from '../list-item';
import { ListItemHeaderModule } from '../list-item-header';
import { ComboBoxComponent } from './combo-box.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    InputContainerModule,
    InputModule,
    InputSectionModule,
    ListItemModule,
    ListItemHeaderModule,
    OverlayModule,
    FormsModule,
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
