import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../input/input.module';
import { ListItemModule } from '../list-item/list-item.module';
import { ListItemHeaderModule } from '../list-item-header/list-item-header.module';
import { SearchInputModule } from '../search-input/search-input.module';
import { ComboBoxComponent } from './combo-box.component';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    ListItemModule,
    ListItemHeaderModule,
    OverlayModule,
    SearchInputModule,
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
