import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabHeaderComponent } from './tab-header.component';

@NgModule({
  declarations: [TabHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [TabHeaderComponent]
})
export class TabHeaderModule { }
