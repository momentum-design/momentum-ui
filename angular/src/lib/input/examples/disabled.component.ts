import { Component } from '@angular/core';

@Component({
  selector: 'example-input-disabled',
  template: `
    <md-input
      [(ngModel)]="dataModel"
      inputSize="small-5"
      [disabled]="true"
      label="Disabled Input"
    >
    </md-input>
  `,
})
export class ExampleInputDisabledComponent {
  dataModel: string = 'disabled';
}
