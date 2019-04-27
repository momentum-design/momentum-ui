import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemModule } from '../list-item';
import { ListItemSectionModule } from '../list-item-section';
import { ListItemHeaderComponent } from './list-item-header.component';

@NgModule({
  imports: [CommonModule, ListItemModule, ListItemSectionModule],
  declarations: [ListItemHeaderComponent],
  exports: [ListItemHeaderComponent]
})
export class ListItemHeaderModule {}
