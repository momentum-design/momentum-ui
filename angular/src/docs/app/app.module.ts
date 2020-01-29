import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ListItemModule, ListModule, SideBarBodyModule, SideBarModule, SidebarNavItemModule, SidebarNavModule, TopbarModule } from '@momentum-ui/angular';
import { ExamplesModule } from 'src/lib/examples.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KitchenSinkComponent } from './kitchen-sink/kitchen-sink.component';
import { PlaygroundComponent } from './playground/playground.component';

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
