import { Component } from '@angular/core';

@Component({
  selector: 'example-call-control-default',
  template: `
    <md-call-control
      type="microphone-muted"
      ariaLabel="For the Win"
      size=20
      iconSize=10
    ></md-call-control>
    <md-call-control
      type="microphone-muted"
      ariaLabel="For the Win"
      size=40
      iconSize=16
    ></md-call-control>
    <md-call-control
      type="microphone-muted"
      ariaLabel="For the Win"
    ></md-call-control>
  `,
})
export class ExampleCallControlDefaultComponent {
  constructor() {}
}
