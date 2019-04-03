import { Component } from '@angular/core';

@Component({
  selector: 'example-avatar-group',
  template: `
    <cui-avatar
      title="Tom Smith"
      type="group"
      backgroundColor="#FFD87B"
      color="rgba(0,0,0,.5)"
    ></cui-avatar>
  `,
})
export class ExampleAvatarGroupComponent {
  constructor() {}
}
