import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
  AlertCallModule,
  AvatarModule,
  ButtonModule,
} from '@collab-ui/angular';
import {
  ExampleAlertCallDefaultComponent,
} from './index';

@NgModule({
  imports: [
    AlertCallModule,
    AvatarModule,
    ButtonModule,
  ],
  declarations: [
    ExampleAlertCallDefaultComponent,
  ],
  exports: [
    ExampleAlertCallDefaultComponent,
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AlertCallExamplesModule { }
