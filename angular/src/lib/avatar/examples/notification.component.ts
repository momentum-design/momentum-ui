import { Component } from '@angular/core';

@Component({
  selector: 'example-avatar-notification',
  template: `
    <cui-avatar title="Tom Smith" [hasNotification]="true"></cui-avatar>
  `,
})
export class ExampleAvatarNotificationComponent {
  constructor() {}
}
