import { Component } from '@angular/core';

@Component({
  selector: 'example-call-control-active',
  template: `
    <md-call-control
      type="microphone-muted"
      ariaLabel="For the Win"
      [active]="true"
      (click)="onClick()"
    ></md-call-control>
  `,
})
export class ExampleCallControlActiveComponent {
  constructor() {}

  onClick() {
    alert('click');
  }
}
