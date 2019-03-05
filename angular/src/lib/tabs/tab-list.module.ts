import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabListComponent } from './tab-list.component';

@NgModule({
  declarations: [TabListComponent],
  imports: [
    CommonModule
  ],
  exports: [TabListComponent]
})
export class TabListModule { }
