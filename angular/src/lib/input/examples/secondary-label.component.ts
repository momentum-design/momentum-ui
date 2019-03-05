
import { Component } from '@angular/core';


@Component({
  selector: 'example-input-secondary-label',
  template: `
    <cui-input
      [(ngModel)]="dataModel"
      inputSize="small-5"
      secondaryLabel="Secondary Label"
    ></cui-input>
  `,
})
export class ExampleInputSecondaryLabelComponent {

  dataModel = "Text"

}
