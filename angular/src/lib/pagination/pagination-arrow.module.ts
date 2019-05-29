import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationArrowComponent } from './pagination-arrow.component';

@NgModule({
  declarations: [PaginationArrowComponent],
  imports: [
    CommonModule
  ],
  exports: [PaginationArrowComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaginationArrowModule { }
