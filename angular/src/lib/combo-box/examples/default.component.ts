import { Component } from '@angular/core';

@Component({
  selector: 'example-combo-box-default',
  template: `
    <md-combo-box
      [options]="options"
      (select)="onSelect($event)"
      (change)="onChange($event)"
    >
    </md-combo-box>
  `,
})
export class ExampleComboBoxDefaultComponent {
  options = ['a', 'ab', 'abc'];

  onSelect(option: Object | string) {}
  onChange(event: Event) {}
}
