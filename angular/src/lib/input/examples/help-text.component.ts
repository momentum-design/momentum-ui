import { Component } from '@angular/core';

@Component({
  selector: 'example-input-helptext',
  template: `
    <md-input-container
      inputSize="small-5"
      helpText="Helper Text Here"
      label="Help Text Input"
    >
      <input
        mdInput
        value='Help Text'
      />
    </md-input-container>
  `,
})

export class ExampleInputHelpTextComponent {}
