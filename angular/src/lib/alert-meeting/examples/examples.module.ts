import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
  AlertMeetingModule,
  AvatarModule,
  ButtonModule,
  CompositeAvatarModule,
} from '@collab-ui/angular';
import {
  ExampleAlertMeetingAvatarComponent,
  ExampleAlertMeetingDefaultComponent,
  ExampleAlertMeetingMultipleComponent,
} from './index';

@NgModule({
  imports: [
    AlertMeetingModule,
    AvatarModule,
    ButtonModule,
    CompositeAvatarModule,
  ],
  declarations: [
    ExampleAlertMeetingAvatarComponent,
    ExampleAlertMeetingDefaultComponent,
    ExampleAlertMeetingMultipleComponent,
  ],
  exports: [
    ExampleAlertMeetingAvatarComponent,
    ExampleAlertMeetingDefaultComponent,
    ExampleAlertMeetingMultipleComponent,
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AlertMeetingExamplesModule { }
