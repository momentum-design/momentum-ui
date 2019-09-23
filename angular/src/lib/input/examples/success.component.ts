import { Component } from '@angular/core';

@Component({
  selector: 'example-input-success',
  template: `
    <md-input-container
      inputSize="small-5"
      label="Success Label"
      [messageArr]="[
        {
          message: 'This is where the success message would be.',
          type: 'success'
        }
      ]"
    >
      <input
        mdInput
        value='Success'
      />
    </md-input-container>
  `,
})

export class ExampleInputSuccessComponent {}
