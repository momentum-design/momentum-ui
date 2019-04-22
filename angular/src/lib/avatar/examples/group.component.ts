import { Component } from '@angular/core';

@Component({
  selector: 'example-avatar-group',
  template: `
    <md-avatar
      title="Tom Smith"
      type="group"
      backgroundColor="#FFD87B"
      color="rgba(0,0,0,.5)"
    ></md-avatar>
  `,
})
export class ExampleAvatarGroupComponent {
  constructor() {}
}
