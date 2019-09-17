import { Component } from '@angular/core';

@Component({
  selector: 'example-input-secondary-label',
  template: `
    <md-input-group
      inputSize="small-5"
      secondaryLabel="Secondary Label"
    >
      <input
        mdInput
        value='Text'
      />
    </md-input-group>
  `,
})

export class ExampleInputSecondaryLabelComponent {}
