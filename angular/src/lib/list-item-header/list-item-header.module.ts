import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemModule } from '../list-item/list-item.module';
import { ListItemSectionModule } from '../list-item-section/list-item-section.module';
import { ListItemHeaderComponent } from './list-item-header.component';

@NgModule({
  imports: [CommonModule, ListItemModule, ListItemSectionModule],
  declarations: [ListItemHeaderComponent],
  exports: [ListItemHeaderComponent]
})
export class ListItemHeaderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ListItemHeaderModule,
      providers: [],
    };
  }
}
