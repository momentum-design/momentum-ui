import { Component } from '@angular/core';

@Component({
  selector: 'example-composite-avatar-default',
  template: `
    <cui-composite-avatar size=40>
      <cui-avatar title="Tom Smith"></cui-avatar>
      <cui-avatar title="Tom Smith" type="active"></cui-avatar>
    </cui-composite-avatar>
  `,
})
export class ExampleCompositeAvatarComponent {
  constructor() {}
}
