import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TabModule } from '@momentum-ui/angular';
import { TabContentModule } from '@momentum-ui/angular';
import { TabHeaderModule } from '@momentum-ui/angular';
import { TabListModule } from '@momentum-ui/angular';
import { TabPaneModule } from '@momentum-ui/angular';
import { TabsModule } from '@momentum-ui/angular';

import {
  ExampleTabsDefaultComponent,
  ExampleTabsDisableComponent,
  ExampleTabsPillsComponent,
} from './index';

@NgModule({
  imports: [
    TabsModule,
    TabContentModule,
    TabHeaderModule,
    TabListModule,
    TabPaneModule,
    TabModule,
  ],
  exports: [
    ExampleTabsDefaultComponent,
    ExampleTabsDisableComponent,
    ExampleTabsPillsComponent
  ],
  declarations: [
    ExampleTabsDefaultComponent,
    ExampleTabsDisableComponent,
    ExampleTabsPillsComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabsExamplesModule {}
