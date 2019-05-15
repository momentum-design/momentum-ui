import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PageHeaderModule } from '@momentum-ui/angular';
import { ExamplePageHeaderDefaultComponent } from './index';
import { ExamplePageHeaderStaticComponent } from './index';

@NgModule({
  imports: [
    PageHeaderModule
  ],
  declarations: [
    ExamplePageHeaderDefaultComponent,
    ExamplePageHeaderStaticComponent
  ],
  exports: [
    ExamplePageHeaderDefaultComponent,
    ExamplePageHeaderStaticComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageHeaderExamplesModule { }
