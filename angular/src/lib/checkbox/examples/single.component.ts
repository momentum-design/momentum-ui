import { Component } from '@angular/core';

@Component({
  selector: 'example-checkbox-single',
  template: `
    <md-checkbox
      name="TDG"
      value="val1"
      label="Single Checkbox"
      [(ngModel)]="checkedValue"
      solo="true"
      htmlId="val1">
    </md-checkbox>

   Boolean:  {{checkedValue}}
  `,
})
export class ExampleCheckboxSingleComponent {
  checkedValue: boolean = false;
}
