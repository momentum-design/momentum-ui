import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AlertExamplesModule } from './alert/examples/examples.module';
import { BadgeExamplesModule } from './badge/examples/examples.module';
import { ButtonExamplesModule } from './button/examples/examples.module';
import { CheckboxExamplesModule } from './checkbox/examples/examples.module';
import { RadioExamplesModule } from './radio/examples/examples.module';
import { InputExamplesModule } from './input/examples/examples.module';
import { ListSeparatorExamplesModule } from './list-separator/examples/examples.module';
import { TopbarExamplesModule } from './topbar/examples/examples.module';

@NgModule({
  imports: [
    AlertExamplesModule,
    BadgeExamplesModule,
    ButtonExamplesModule,
    CheckboxExamplesModule,
    RadioExamplesModule,
    InputExamplesModule,
    ListSeparatorExamplesModule,
    TopbarExamplesModule,
  ],
  exports: [
    AlertExamplesModule,
    BadgeExamplesModule,
    ButtonExamplesModule,
    CheckboxExamplesModule,
    RadioExamplesModule,
    InputExamplesModule,
    ListSeparatorExamplesModule,
    TopbarExamplesModule,
  ],
  declarations: [],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class ExamplesModule { }
