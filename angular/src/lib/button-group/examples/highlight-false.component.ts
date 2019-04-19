import { Component } from '@angular/core';

@Component({
  selector: 'example-button-group-highlight-false',
  template: `
    <md-button-group [highlightSelected]="false">
      <button md-button aria-label="Left">
      <md-icon name="icon-arrow-left_12"></md-icon>
      </button>
      <button md-button aria-label="Today">Today</button>
      <button md-button aria-label="Right">
        <md-icon name="icon-arrow-right_12"></md-icon>
      </button>
    </md-button-group>
  `,
})
export class ExampleButtonGroupHighlightFalseComponent {
  constructor() {}
}
