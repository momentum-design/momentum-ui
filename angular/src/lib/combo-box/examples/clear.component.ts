import { Component } from '@angular/core';

@Component({
  selector: 'example-combo-box-clear',
  template: `
    <md-combo-box
      [options]="options"
      [clear]="true"
      (select)="onSelect($event)"
      (change)="onChange($event)"
    >
    </md-combo-box>
  `,
})
export class ExampleComboBoxClearComponent {
  options = ['a', 'ab', 'abc'];

  onSelect(option: Object | string) {}
  onChange(event: Event) {}
}
