import { Component } from '@angular/core';

@Component({
  selector: 'example-input-readonly',
  template: `
    <md-input-container
      inputSize="small-5"
      label="Read Only Input"
    >
      <input
        mdInput
        readonly
        value='Read Only Text'
      />
    </md-input-container>
  `,
})

export class ExampleInputReadOnlyComponent {}
