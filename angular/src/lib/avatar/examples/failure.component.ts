import { Component } from '@angular/core';

@Component({
  selector: 'example-avatar-failure',
  template: `
    <cui-avatar title="Tom Smith" [failureBadge]="true"></cui-avatar>
  `,
})
export class ExampleAvatarFailureComponent {
  constructor() {}
}
