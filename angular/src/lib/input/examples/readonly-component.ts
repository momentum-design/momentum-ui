import { Component } from '@angular/core';

@Component({
  selector: 'example-input-readonly',
  template: `
    <md-input-group
      inputSize="small-5"
      label="Read Only Input"
    >
      <input
        mdInput
        readonly
        value='Read Only Text'
      />
    </md-input-group>
  `,
})

export class ExampleInputReadOnlyComponent {}
