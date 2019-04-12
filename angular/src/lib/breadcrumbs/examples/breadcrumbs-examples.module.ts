import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsModule } from '@momentum-ui/angular';
import { BreadcrumbsDefaultComponent } from './breadcrumbs-default.component';

@NgModule({
  declarations: [BreadcrumbsDefaultComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule
  ],
  exports: [BreadcrumbsDefaultComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BreadcrumbsExamplesModule { }
