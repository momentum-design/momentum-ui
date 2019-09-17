import { Component } from '@angular/core';

@Component({
  selector: 'example-input-helptext',
  template: `
    <md-input-group
      inputSize="small-5"
      helpText="Helper Text Here"
      label="Help Text Input"
    >
      <input
        mdInput
        value='Help Text'
      />
    </md-input-group>
  `,
})

export class ExampleInputHelpTextComponent {}
