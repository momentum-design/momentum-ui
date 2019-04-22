import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarBodyComponent } from './sidebar-body.component';

@NgModule({
  declarations: [SideBarBodyComponent],
  imports: [
    CommonModule
  ],
  exports: [SideBarBodyComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class SideBarBodyModule { }
