import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarFooterComponent } from './sidebar-footer.component';

@NgModule({
  declarations: [SidebarFooterComponent],
  imports: [
    CommonModule
  ],
  exports: [SidebarFooterComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SidebarFooterModule { }
