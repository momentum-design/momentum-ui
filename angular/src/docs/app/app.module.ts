import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { AlertModule, AlertService } from '@collab-ui/angular';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ExamplesModule } from 'src/lib/examples.module';

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent,
  ],
  imports: [
    BrowserModule,
    OverlayModule,
    PortalModule,
    AppRoutingModule,
    ExamplesModule,
  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: []
})
export class AppModule { }
