import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TabsModule } from '../tabs.module';

import {
  ExampleTabsDefaultComponent,
  ExampleTabsDisableComponent,
  ExampleTabsPillsComponent,
} from './index';

@NgModule({
  imports: [
    TabsModule,
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
