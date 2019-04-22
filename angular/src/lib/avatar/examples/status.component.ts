import { Component } from '@angular/core';

@Component({
  selector: 'example-avatar-status',
  template: `
    <md-avatar title="Tom Smith" type="dnd"></md-avatar>
    <md-avatar title="Tom Smith" type="ooo"></md-avatar>
  `,
})
export class ExampleAvatarStatusComponent {
  constructor() {}
}
