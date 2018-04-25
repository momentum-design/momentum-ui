import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from './data/data.service';
import { HeaderComponent } from './header/header.component';
import { NavService } from './nav/nav.service';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { ReplaceDashPipe } from './pipes/replace-dash.pipe';
import { HighlightDirective } from './highlight/highlight.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent,
    EscapeHtmlPipe,
    ReplaceDashPipe,
    CapitalizePipe,
    HighlightDirective,
  ],
  exports: [
    HeaderComponent,
    EscapeHtmlPipe,
    ReplaceDashPipe,
    CapitalizePipe,
    HighlightDirective,
  ],
  providers: [
    NavService,
    DataService
  ]
})
export class SharedModule { }
