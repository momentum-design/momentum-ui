import { Component } from '@angular/core';

@Component({
  selector: 'example-composite-avatar-default',
  template: `
    <md-composite-avatar size="40">
      <md-avatar title="Tom Smith"></md-avatar>
      <md-avatar title="Tom Smith" type="active"></md-avatar>
    </md-composite-avatar>
  `,
})
export class ExampleCompositeAvatarComponent {
  constructor() {}
}
