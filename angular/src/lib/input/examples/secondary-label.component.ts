import { Component } from '@angular/core';

@Component({
  selector: 'example-input-secondary-label',
  template: `
    <md-input-container
      inputSize="small-5"
      secondaryLabel="Secondary Label"
    >
      <input
        mdInput
        value='Text'
      />
    </md-input-container>
  `,
})

export class ExampleInputSecondaryLabelComponent {}
