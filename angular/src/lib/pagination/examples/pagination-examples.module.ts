import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationDefaultComponent } from './pagination-default.component';
import { PaginationDynamicComponent } from './pagination-dynamic.component';
import { PaginationModule } from '../pagination.module';

@NgModule({
  declarations: [
    PaginationDefaultComponent,
    PaginationDynamicComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    PaginationModule
  ],
  exports: [
    PaginationDefaultComponent,
    PaginationDynamicComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaginationExamplesModule { }
