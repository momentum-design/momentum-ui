import { Component } from '@angular/core';

@Component({
  selector: 'example-input-disabled',
  template: `
    <md-input-group
      label="Disabled Input"
      inputSize="small-5"
    >
      <input
        mdInput
        disabled
        value='Disabled'
      />
    </md-input-group>
  `,
})

export class ExampleInputDisabledComponent {}
