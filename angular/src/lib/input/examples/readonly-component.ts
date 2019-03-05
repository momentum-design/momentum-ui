
import { Component } from '@angular/core';


@Component({
  selector: 'example-input-readonly',
  template: `
    <cui-input
      inputSize="small-5"
      [readOnly]="true"
      label="Read Only Input"
      [(ngModel)]="dataModel"
    ></cui-input>
  `,
})
export class ExampleInputReadOnlyComponent {

  dataModel = "Read Only Text"

}
