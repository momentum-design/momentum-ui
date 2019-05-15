import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './sidebar.component';

@NgModule({
  declarations: [SideBarComponent],
  imports: [
    CommonModule,
  ],
  exports: [SideBarComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SideBarModule { }
