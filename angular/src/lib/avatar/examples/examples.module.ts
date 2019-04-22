import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule, IconModule } from '@momentum-ui/angular';
import {
  ExampleAvatarActiveComponent,
  ExampleAvatarBotComponent,
  ExampleAvatarClickableComponent,
  ExampleAvatarDarkComponent,
  ExampleAvatarDefaultComponent,
  ExampleAvatarFailureComponent,
  ExampleAvatarGroupComponent,
  ExampleAvatarIconComponent,
  ExampleAvatarInactiveComponent,
  ExampleAvatarNotificationComponent,
  ExampleAvatarSelfComponent,
  ExampleAvatarStatusComponent,
  ExampleAvatarTypingComponent,
} from './index';

@NgModule({
  imports: [CommonModule, AvatarModule, IconModule],
  declarations: [
    ExampleAvatarActiveComponent,
    ExampleAvatarBotComponent,
    ExampleAvatarClickableComponent,
    ExampleAvatarDarkComponent,
    ExampleAvatarDefaultComponent,
    ExampleAvatarFailureComponent,
    ExampleAvatarGroupComponent,
    ExampleAvatarIconComponent,
    ExampleAvatarInactiveComponent,
    ExampleAvatarNotificationComponent,
    ExampleAvatarSelfComponent,
    ExampleAvatarStatusComponent,
    ExampleAvatarTypingComponent,
  ],
  exports: [
    ExampleAvatarActiveComponent,
    ExampleAvatarBotComponent,
    ExampleAvatarClickableComponent,
    ExampleAvatarDarkComponent,
    ExampleAvatarDefaultComponent,
    ExampleAvatarFailureComponent,
    ExampleAvatarGroupComponent,
    ExampleAvatarIconComponent,
    ExampleAvatarInactiveComponent,
    ExampleAvatarNotificationComponent,
    ExampleAvatarSelfComponent,
    ExampleAvatarStatusComponent,
    ExampleAvatarTypingComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AvatarExamplesModule {}
