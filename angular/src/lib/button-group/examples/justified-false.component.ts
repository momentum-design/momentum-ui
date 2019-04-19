import { Component } from '@angular/core';

@Component({
  selector: 'example-button-group-justified-false',
  template: `
    <md-button-group [justified]="false">
      <button md-button aria-label="1">one</button>
      <button md-button aria-label="2" [disabled]="true">two</button>
      <button md-button aria-label="3">three</button>
    </md-button-group>
  `,
})
export class ExampleButtonGroupJustifiedFalseComponent {
  constructor() {}
}
