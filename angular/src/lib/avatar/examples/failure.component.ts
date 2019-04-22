import { Component } from '@angular/core';

@Component({
  selector: 'example-avatar-failure',
  template: `
    <md-avatar title="Tom Smith" [failureBadge]="true"></md-avatar>
  `,
})
export class ExampleAvatarFailureComponent {
  constructor() {}
}
