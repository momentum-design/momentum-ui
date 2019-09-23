import { Component } from '@angular/core';

@Component({
  selector: 'example-input-clear',
  template: `
    <md-input-container
      [clear]="true"
      inputSize="small-5"
      label="Input with clear"
    >
      <input
        mdInput
        value='Text'
      />
    </md-input-container>
  `,
})

export class ExampleInputClearComponent {}
