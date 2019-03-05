import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ButtonModule } from '@collab-ui/angular';
import {
  ExampleButtonDefaultComponent,
  ExampleButtonColorComponent
} from './index';

@NgModule({
  imports: [
    ButtonModule
  ],
  exports: [
    ExampleButtonDefaultComponent,
    ExampleButtonColorComponent,
  ],
  declarations: [
    ExampleButtonDefaultComponent,
    ExampleButtonColorComponent,
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ButtonExamplesModule { }
