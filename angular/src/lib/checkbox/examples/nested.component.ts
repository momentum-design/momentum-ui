import { Component } from '@angular/core';

@Component({
  selector: 'example-checkbox-nested',
  template: `
    <cui-checkbox
      name="TDG"
      value="val1"
      label="Parent Checkbox"
      [(ngModel)]="checkedValues"
      htmlId="val1">
    </cui-checkbox>

    <cui-checkbox
      name="TDG"
      value="Nested val1"
      label="Nested Value 1"
      [(ngModel)]="checkedValues"
      htmlId="nestedval1"
      [nestedLevel]="1">
    </cui-checkbox>

    <cui-checkbox
      name="TDG"
      value="Nested val2"
      label="Nested Value 2"
      [(ngModel)]="checkedValues"
      htmlId="nestedval2"
      [nestedLevel]="2">
    </cui-checkbox>

    <cui-checkbox
      name="TDG"
      value="Nested val3"
      label="Nested Value 3"
      [(ngModel)]="checkedValues"
      htmlId="nestedval3"
      [nestedLevel]="3">
    </cui-checkbox>

  `,
})
export class ExampleCheckboxNestedComponent {

  checkedValues: string[] = [''];

}
