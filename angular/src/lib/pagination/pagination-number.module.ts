import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationNumberComponent } from './pagination-number.component';

@NgModule({
  declarations: [PaginationNumberComponent],
  imports: [
    CommonModule
  ],
  exports: [PaginationNumberComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaginationNumberModule { }
