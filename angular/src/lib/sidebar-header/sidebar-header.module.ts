import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarHeaderComponent } from './sidebar-header.component';

@NgModule({
  declarations: [SidebarHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [SidebarHeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SidebarHeaderModule { }
