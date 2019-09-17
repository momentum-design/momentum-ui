import { Component } from '@angular/core';

@Component({
  selector: 'example-input-warning',
  template: `
    <md-input-group
      inputSize="small-5"
      label="Warning Label"
      [messageArr]="[
        {
          message: 'This is where the warning message would be.',
          type: 'warning'
        }
      ]"
    >
      <input
        mdInput
        value='Warning'
      />
    </md-input-group>
  `,
})

export class ExampleInputWarningComponent {}
