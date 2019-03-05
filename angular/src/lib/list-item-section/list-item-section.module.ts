import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemSectionComponent } from './list-item-section.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListItemSectionComponent],
  exports: [ListItemSectionComponent]
})
export class ListItemSectionModule { }
