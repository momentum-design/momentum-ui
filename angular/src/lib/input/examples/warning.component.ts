import { Component } from '@angular/core';

@Component({
  selector: 'example-input-warning',
  template: `
    <md-input-container
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
    </md-input-container>
  `,
})

export class ExampleInputWarningComponent {}
