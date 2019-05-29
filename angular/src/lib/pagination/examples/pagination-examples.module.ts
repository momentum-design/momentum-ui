import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationDefaultComponent } from './pagination-default.component';
import { PaginationModule } from '../pagination.module';

@NgModule({
  declarations: [PaginationDefaultComponent],
  imports: [
    CommonModule,
    PaginationModule
  ],
  exports: [PaginationDefaultComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaginationExamplesModule { }
