import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPaneComponent } from './tab-pane.component';

@NgModule({
  declarations: [TabPaneComponent],
  imports: [
    CommonModule
  ],
  exports: [TabPaneComponent]
})
export class TabPaneModule { }
