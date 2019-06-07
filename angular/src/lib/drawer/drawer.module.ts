import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [DrawerComponent],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [DrawerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrawerModule { }
