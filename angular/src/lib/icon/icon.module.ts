import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IconComponent],
  exports: [IconComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IconModule { }
