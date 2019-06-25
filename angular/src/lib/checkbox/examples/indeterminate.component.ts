import { Component } from '@angular/core';

@Component({
  selector: 'example-checkbox-indeterminate',
  template: `
    <md-checkbox
      name="TDG"
      value="val5"
      label="Indeterminate Checkbox"
      [(ngModel)]="checkedValues"
      [indeterminate]="true"
      htmlId="val5"
    >
    </md-checkbox>
  `,
})
export class ExampleCheckboxIndeterminateComponent {
  checkedValues: string[] = [];
}
