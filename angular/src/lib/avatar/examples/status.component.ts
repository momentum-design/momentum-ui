import { Component } from '@angular/core';

@Component({
  selector: 'example-avatar-status',
  template: `
    <cui-avatar title="Tom Smith" type="dnd"></cui-avatar>
    <cui-avatar title="Tom Smith" type="ooo"></cui-avatar>
  `,
})
export class ExampleAvatarStatusComponent {
  constructor() {}
}
