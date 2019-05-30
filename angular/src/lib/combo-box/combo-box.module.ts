import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../input';
import { ListItemModule } from '../list-item';
import { ListItemHeaderModule } from '../list-item-header';
import { SearchInputModule } from '../search-input';
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
