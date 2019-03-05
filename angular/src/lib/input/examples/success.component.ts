import { Component } from '@angular/core';


@Component({
  selector: 'example-input-success',
  template: `
    <cui-input
      [(ngModel)]="dataModel"
      inputSize="small-5"
      label="Success Label"
      [errorArr]="[{error: 'This is where the success message would be.', type: 'success'}]"
    >
    </cui-input>
  `,
})
export class ExampleInputSuccessComponent {

  dataModel: string = 'success';
}
