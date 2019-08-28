import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ListItemModule,
  ListModule,
  SideBarModule,
  SideBarBodyModule,
  SidebarNavModule,
  SidebarNavItemModule,
  TopbarModule,
} from '@momentum-ui/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaygroundComponent } from './playground/playground.component';
import { KitchenSinkComponent } from './kitchen-sink/kitchen-sink.component';
import { ExamplesModule } from 'src/lib/examples.module';

@NgModule({
  declarations: [AppComponent, PlaygroundComponent, KitchenSinkComponent],
  imports: [
    BrowserModule,
    ListItemModule,
    ListModule,
    SideBarModule,
    SideBarBodyModule,
    SidebarNavModule,
    SidebarNavItemModule,
    TopbarModule,
    AppRoutingModule,
    ExamplesModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class AppModule {}
