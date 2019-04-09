import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
  AlertCallModule,
  AvatarModule,
  ButtonModule,
} from '@momentum-ui/angular';
import {
  ExampleAlertCallDefaultComponent,
  ExampleAlertCallDeviceComponent,
  ExampleAlertCallDeviceListComponent,
  ExampleAlertCallNumberComponent,
} from './index';

@NgModule({
  imports: [
    AlertCallModule,
    AvatarModule,
    ButtonModule,
  ],
  declarations: [
    ExampleAlertCallDefaultComponent,
    ExampleAlertCallDeviceComponent,
    ExampleAlertCallDeviceListComponent,
    ExampleAlertCallNumberComponent,
  ],
  exports: [
    ExampleAlertCallDefaultComponent,
    ExampleAlertCallDeviceComponent,
    ExampleAlertCallDeviceListComponent,
    ExampleAlertCallNumberComponent,
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AlertCallExamplesModule { }
