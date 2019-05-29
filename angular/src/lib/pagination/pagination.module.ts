import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { PaginationArrowModule } from './pagination-arrow.module';
import { PaginationNumberModule } from './pagination-number.module';

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    PaginationArrowModule,
    PaginationNumberModule
  ],
  exports: [PaginationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaginationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PaginationModule,
      providers: [],
    };
  }
}
