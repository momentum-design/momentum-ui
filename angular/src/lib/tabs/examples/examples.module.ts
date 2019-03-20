import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TabModule } from '@collab-ui/angular';
import { TabContentModule } from '@collab-ui/angular';
import { TabHeaderModule } from '@collab-ui/angular';
import { TabListModule } from '@collab-ui/angular';
import { TabPaneModule } from '@collab-ui/angular';
import { TabsModule } from '@collab-ui/angular';

import { ExampleTabsDefaultComponent, ExampleTabsDisableComponent } from './index';

@NgModule({
  imports: [
    TabsModule,
    TabContentModule,
    TabHeaderModule,
    TabListModule,
    TabPaneModule,
    TabModule
  ],
  exports: [
    ExampleTabsDefaultComponent,
    ExampleTabsDisableComponent
  ],
  declarations: [
    ExampleTabsDefaultComponent,
    ExampleTabsDisableComponent
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class TabsExamplesModule { }
