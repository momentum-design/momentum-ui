import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListItemComponent],
  exports: [ListItemComponent]
})
export class ListItemModule { }
