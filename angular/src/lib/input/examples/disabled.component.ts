import { Component } from '@angular/core';

@Component({
  selector: 'example-input-disabled',
  template: `
    <md-input-container
      label="Disabled Input"
      inputSize="small-5"
    >
      <input
        mdInput
        disabled
        value='Disabled'
      />
    </md-input-container>
  `,
})

export class ExampleInputDisabledComponent {}
