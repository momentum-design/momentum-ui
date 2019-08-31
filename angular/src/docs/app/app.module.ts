import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AvatarElementModule } from '../../lib/avatar-element/avatar-element.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ExamplesModule } from 'src/lib/examples.module';

@NgModule({
  declarations: [AppComponent, PlaygroundComponent],
  imports: [BrowserModule, AppRoutingModule, ExamplesModule, AvatarElementModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class AppModule {}
