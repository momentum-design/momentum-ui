import { Component } from '@angular/core';

@Component({
  selector: 'example-button-group-pill',
  template: `
    <div class="columns small-4">
      <md-button-group type="pill">
        <button md-button aria-label="left">
          <md-icon name="icon-arrow-left_12"></md-icon>
        </button>
        <button md-button aria-label="right">
          <md-icon name="icon-arrow-right_12"></md-icon>
        </button>
      </md-button-group>
    </div>
    <div class="columns small-4">
      <md-button-group type="pill">
        <button md-button aria-label="left">
          <md-icon name="icon-flag_16"></md-icon>
        </button>
        <button md-button aria-label="right">
          <md-icon name="icon-cancel_16"></md-icon>
        </button>
      </md-button-group>
    </div>
    <div class="columns small-4">
      <md-button-group [justified]="false" type="pill" pillWidth="60px">
        <button md-button aria-label="left">
          <md-icon name="icon-flag_16"></md-icon>
        </button>
      </md-button-group>
    </div>
  `,
})
export class ExampleButtonGroupPillComponent {
  constructor() {}
}
