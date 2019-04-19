import { Component } from '@angular/core';

@Component({
  selector: 'example-button-group-default',
  template: `
    <md-button-group>
      <button md-button aria-label="1">one</button>
      <button md-button aria-label="2" [disabled]="true">two</button>
      <button md-button aria-label="3">three</button>
    </md-button-group>
  `,
})
export class ExampleButtonGroupDefaultComponent {
  constructor() {}
}
