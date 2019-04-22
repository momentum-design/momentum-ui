import { Component } from '@angular/core';

@Component({
  selector: 'example-input-readonly',
  template: `
    <md-input
      inputSize="small-5"
      [readOnly]="true"
      label="Read Only Input"
      [(ngModel)]="dataModel"
    ></md-input>
  `,
})
export class ExampleInputReadOnlyComponent {
  dataModel = 'Read Only Text';
}
