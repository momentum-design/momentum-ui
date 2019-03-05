import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AlertExamplesModule } from './alert/examples/examples.module';
import { BadgeExamplesModule } from './badge/examples/examples.module';
import { ButtonExamplesModule } from './button/examples/examples.module';
import { SampleExamplesModule } from './sample/examples/sample-examples.module';

@NgModule({
  imports: [
    AlertExamplesModule,
    BadgeExamplesModule,
    ButtonExamplesModule,
    SampleExamplesModule,
  ],
  exports: [
    AlertExamplesModule,
    BadgeExamplesModule,
    ButtonExamplesModule,
    SampleExamplesModule,
  ],
  declarations: [],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class ExamplesModule { }
