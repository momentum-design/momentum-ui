import { Component } from '@angular/core';

@Component({
  selector: 'example-avatar-dark',
  template: `
    <md-avatar
      title="Tom Smith"
      type="active"
      theme="dark"
      size="72"
      src="http://react.momentum-ui.com/barbara.png"
    ></md-avatar>
  `,
})
export class ExampleAvatarDarkComponent {
  constructor() {}
}
