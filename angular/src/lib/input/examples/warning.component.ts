import { Component } from '@angular/core';

@Component({
  selector: 'example-input-warning',
  template: `
    <md-input
      [(ngModel)]="dataModel"
      inputSize="small-5"
      label="Warning Label"
      [errorArr]="[{
        error: 'This is where the warning message would be.',
        type: 'warning'
      }]"
    >
    </md-input>
  `,
})
export class ExampleInputWarningComponent {
  dataModel: string = 'warning';
  // refer to error example to use the warning angular validator
}
