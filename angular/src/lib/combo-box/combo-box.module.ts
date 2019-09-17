import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComboBoxComponent } from './combo-box.component';
import { IconModule } from '../icon';
import { InputGroupModule } from '../input-group';
import { InputModule } from '../input';
import { InputSectionModule } from '../input-section';
import { ListItemHeaderModule } from '../list-item-header';
import { ListItemModule } from '../list-item';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    InputGroupModule,
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
