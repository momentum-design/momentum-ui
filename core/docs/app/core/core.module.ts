import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CardModule,
  ModalModule,
 } from '@collab-ui/angular';
// import { HighlightModule } from 'ngx-highlightjs';
// import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { CodeExampleComponent } from './code-example/code-example.component';
import { ComponentComponent } from './component/component.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SectionComponent } from './section/section.component';

const hljsOptions = {
  theme: 'agate',
  path: 'assets/highlight/highlight.pack'
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CardModule.forRoot(),
    // HighlightJsModule,
    // HighlightModule.forRoot(),
    ModalModule.forRoot(),
    SharedModule,
  ],
  declarations: [CategoryComponent, ComponentComponent, SectionComponent, CodeExampleComponent, NotFoundComponent],
  // providers: [HighlightJsService],
})
export class CoreModule {}
