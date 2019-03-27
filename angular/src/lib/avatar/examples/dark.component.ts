import { Component } from '@angular/core';

@Component({
  selector: 'example-avatar-dark',
  template: `
    <cui-avatar
      title="Tom Smith"
      type="active"
      theme="dark"
      size="72"
      src="http://react.collab-ui.com/barbara.png"
    ></cui-avatar>
  `,
})
export class ExampleAvatarDarkComponent {
  constructor() {}
}
