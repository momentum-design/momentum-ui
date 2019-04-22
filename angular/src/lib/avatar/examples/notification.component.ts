import { Component } from '@angular/core';

@Component({
  selector: 'example-avatar-notification',
  template: `
    <md-avatar title="Tom Smith" [hasNotification]="true"></md-avatar>
  `,
})
export class ExampleAvatarNotificationComponent {
  constructor() {}
}
