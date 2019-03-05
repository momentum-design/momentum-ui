import { Component } from '@angular/core';

@Component({
  selector: 'example-checkbox-default',
  template: `
    <cui-checkbox
    name="TDG"
    value="val1"
    label="Value 1"
    [(ngModel)]="checkedValues"
    htmlId="val1">
  </cui-checkbox>

  <cui-checkbox
    name="TDG"
    value="val2"
    label="Value 2"
    [(ngModel)]="checkedValues"
    htmlId="val2">
  </cui-checkbox>

  <cui-checkbox
    name="TDG"
    value="val3"
    label="Value 3"
    [(ngModel)]="checkedValues"
    htmlId="val3">
  </cui-checkbox>
  `,
})
export class ExampleCheckboxDefaultComponent {

  checkedValues: string[] = [''];

}
