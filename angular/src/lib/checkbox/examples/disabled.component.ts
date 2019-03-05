import { Component } from '@angular/core';

@Component({
  selector: 'example-checkbox-disabled',
  template: `
    <cui-checkbox
    name="TDG"
    value="val1"
    label="Disabled Checkbox"
    [(ngModel)]="checkedValues"
    [disabled]="true"
    htmlId="val1">
  </cui-checkbox>

  `,
})
export class ExampleCheckboxDisabledComponent {

  checkedValues: string[] = [''];

}
