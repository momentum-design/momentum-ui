import { Component } from '@angular/core';


@Component({
  selector: 'example-input-warning',
  template: `
    <cui-input
      [(ngModel)]="dataModel"
      inputSize="small-5"
      label="Warning Label"
      [errorArr]="[{error: 'This is where the success message would be.', type: 'warning'}]"
    >
    </cui-input>
  `,
})
export class ExampleInputWarningComponent {

  dataModel: string = 'Warning';
}
