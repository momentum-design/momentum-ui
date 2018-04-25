import { HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import {
  CardModule,
  DropdownModule,
  ModalModule,
  TopBarModule,
  TopBarRightModule,
  TopNavModule,
} from '@collab-ui/angular';
// import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

import { StylesModule } from 'app/styles/styles.module';
import * as hljs from 'highlight.js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DevelopModule } from './develop/develop.module';
import { OverviewComponent } from './overview/overview.component';
import { PlaygroundComponent } from './playground/playground.component';
import { SampleContentComponent } from './sample-content/sample-content.component';
import { SharedModule } from './shared/shared.module';
import { KitchenSinkComponent } from './kitchen-sink/kitchen-sink.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    SampleContentComponent,
    PlaygroundComponent,
    KitchenSinkComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    // HighlightJsModule,
    AppRoutingModule,
    CoreModule,
    DevelopModule,
    SharedModule,
    StylesModule,
    CardModule.forRoot(),
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    TopBarModule.forRoot(),
    TopBarRightModule.forRoot(),
    TopNavModule.forRoot(),
  ],
  // providers: [HighlightJsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
