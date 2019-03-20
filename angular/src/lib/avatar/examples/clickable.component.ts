import { Component } from '@angular/core';

@Component({
  selector: 'example-avatar-clickable',
  template: `
    <cui-avatar title="Tom Smith" ariaLabel="Tom Smith" (click)="onClick()"></cui-avatar>
  `,
})
export class ExampleAvatarClickableComponent {
  constructor() {}

  onClick() {
    alert('Clicked');
  }
}
