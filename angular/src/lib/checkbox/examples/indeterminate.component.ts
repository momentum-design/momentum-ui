import { Component } from '@angular/core';

@Component({
  selector: 'example-checkbox-indeterminate',
  template: `
    <cui-checkbox
      name="TDG"
      value="val5"
      label="Indeterminate Checkbox"
      [(ngModel)]="checkedValues"
      [indeterminate]="true"
      htmlId="val5">
    </cui-checkbox>

  `,
})
export class ExampleCheckboxIndeterminateComponent {

  checkedValues: string[] = [''];

}
