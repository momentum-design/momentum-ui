import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item.component';
import { IconModule } from '../icon';
import { ListItemSectionModule} from '../list-item-section';
import { CheckboxModule } from '../checkbox';

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
