import { Component } from '@angular/core';

@Component({
  selector: 'example-avatar-clickable',
  template: `
    <md-avatar
      title="Tom Smith"
      ariaLabel="Tom Smith"
      (click)="onClick()"
    ></md-avatar>
  `,
})
export class ExampleAvatarClickableComponent {
  constructor() {}

  onClick() {
    alert('Clicked');
  }
}
