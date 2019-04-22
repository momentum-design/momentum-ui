import { Component } from '@angular/core';

@Component({
  selector: 'example-checkbox-default',
  template: `
    <md-checkbox
      name="TDG"
      value="val1"
      label="Value 1"
      [(ngModel)]="checkedValues"
      htmlId="val1"
    >
    </md-checkbox>

    <md-checkbox
      name="TDG"
      value="val2"
      label="Value 2"
      [(ngModel)]="checkedValues"
      htmlId="val2"
    >
    </md-checkbox>

    <md-checkbox
      name="TDG"
      value="val3"
      label="Value 3"
      [(ngModel)]="checkedValues"
      htmlId="val3"
    >
    </md-checkbox>
  `,
})
export class ExampleCheckboxDefaultComponent {
  checkedValues: string[] = [''];
}
