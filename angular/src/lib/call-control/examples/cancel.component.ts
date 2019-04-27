import { Component } from '@angular/core';

@Component({
  selector: 'example-call-control-cancel',
  template: `
    <md-call-control
      type="cancel"
      ariaLabel="For the Win"
      (click)="onClick()"
    ></md-call-control>
  `,
})
export class ExampleCallControlCancelComponent {
  constructor() {}

  onClick() {
    alert('click');
  }
}
