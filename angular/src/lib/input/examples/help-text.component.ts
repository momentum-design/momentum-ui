import { Component } from '@angular/core';

@Component({
  selector: 'example-input-helptext',
  template: `
    <md-input
      [(ngModel)]="dataModel"
      inputSize="small-5"
      inputHelpText="Helper Text Here"
      label="Help Text Input"
    ></md-input>
  `,
})
export class ExampleInputHelpTextComponent {
  dataModel = 'Help Text';
}
