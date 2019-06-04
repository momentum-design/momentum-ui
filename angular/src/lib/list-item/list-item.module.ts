import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item.component';
import { IconModule } from '../icon/icon.module';
import { ListItemSectionModule } from '../list-item-section/list-item-section.module';
import { CheckboxModule } from '../checkbox/checkbox.module';

@NgModule({
  imports: [
    CheckboxModule,
    CommonModule,
    IconModule,
    ListItemSectionModule
  ],
  declarations: [ListItemComponent],
  exports: [ListItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListItemModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ListItemModule,
      providers: [],
    };
  }
}
