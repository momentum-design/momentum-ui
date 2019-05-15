import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header.component';
import { PageHeaderContentModule } from './page-header-content.module';

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    CommonModule,
    PageHeaderContentModule
  ],
  exports: [PageHeaderComponent]
})
export class PageHeaderModule { }
