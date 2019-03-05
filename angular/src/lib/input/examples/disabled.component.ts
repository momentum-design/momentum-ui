import { Component } from '@angular/core';


@Component({
  selector: 'example-input-disabled',
  template: `
    <cui-input
      [(ngModel)]="dataModel"
      inputSize="small-5"
      [disabled]="true"
      label="Disabled Input"
    >
    </cui-input>
  `,
})
export class ExampleInputDisabledComponent {

  dataModel: string = 'disabled';
}
