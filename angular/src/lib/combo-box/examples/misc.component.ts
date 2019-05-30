import { Component } from '@angular/core';

@Component({
  selector: 'example-combo-box-misc',
  template: `
    <md-combo-box
      [options]="options"
      [hasSearchIcon]="false"
      placeholder="Name"
      searchProp="name"
      [(ngModel)]="value"
      (select)="onSelect($event)"
      (change)="onChange($event)"
    >
    </md-combo-box>
  `,
})
export class ExampleComboBoxMiscComponent {
  value = {name: 'a', data: 1};
  options = [
    {
      name: 'Name',
      isHeader: true,
    },
    {
      name: 'a',
      data: 1,
    },
    {
      name: 'ab',
      data: 2,
    },
    {
      name: 'abc',
      data: 3,
      disabled: true,
    },
    {
      name: 'abcd',
      data: 4,
    },
  ];

  onSelect(option: any) {
    alert('name:' + option.name + '\ndata:' + option.data);
  }
  onChange(event: Event) {}
}
