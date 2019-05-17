import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [
    CommonModule
  ],
  exports: [BreadcrumbsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BreadcrumbsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BreadcrumbsModule,
      providers: [],
    };
  }
}
