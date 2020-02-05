import { Component } from '@angular/core';

@Component({
  selector: 'example-combo-box-default',
  template: `
    <md-combo-box
      [options]="options"
      (select)="onSelect($event)"
      (change)="onChange($event)"
      (inputValueChange)="onTyping($event)"
    >
    </md-combo-box>
  `,
})
export class ExampleComboBoxDefaultComponent {
  options = ['a', 'ab', 'abc'];

  onSelect(option: Object | string) {
    console.info('selected option: ', option);
  }
  onChange(event: Event) {}

  onTyping(event) {
    console.info('typed: ', event);
  }
}
