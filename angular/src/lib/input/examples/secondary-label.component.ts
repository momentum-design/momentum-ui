import { Component } from '@angular/core';

@Component({
  selector: 'example-input-secondary-label',
  template: `
    <md-input
      [(ngModel)]="dataModel"
      inputSize="small-5"
      secondaryLabel="Secondary Label"
    ></md-input>
  `,
})
export class ExampleInputSecondaryLabelComponent {
  dataModel = 'Text';
}
