import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavComponent } from './sidebar-nav.component';

@NgModule({
  declarations: [SidebarNavComponent],
  imports: [
    CommonModule,
  ],
  exports: [SidebarNavComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SidebarNavModule { }
