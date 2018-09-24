import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from './data/data.service';
import { HeaderComponent } from './header/header.component';
import { HighlightDirective } from './highlight/highlight.directive';
import { NavService } from './nav/nav.service';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { ReplaceDashPipe } from './pipes/replace-dash.pipe';
import { TopBarComponent } from './topBar/top-bar.component';

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
    TopBarComponent,
  ],
  exports: [
    HeaderComponent,
    EscapeHtmlPipe,
    ReplaceDashPipe,
    CapitalizePipe,
    HighlightDirective,
    TopBarComponent,
  ],
  providers: [
    NavService,
    DataService,
  ],
})
export class SharedModule { }
