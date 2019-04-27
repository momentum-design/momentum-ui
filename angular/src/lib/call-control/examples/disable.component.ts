import { Component } from '@angular/core';

@Component({
  selector: 'example-call-control-disable',
  template: `
    <md-call-control
      type="microphone-muted"
      ariaLabel="For the Win"
      [disabled]="true"
      iconColor="gray-40"
      (click)="onClick()"
    ></md-call-control>
  `,
})
export class ExampleCallControlDisableComponent {
  constructor() {}

  onClick() {
    alert('click');
  }
}
