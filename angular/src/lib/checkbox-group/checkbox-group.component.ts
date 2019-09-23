import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'md-checkbox-group',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  host: {
    class: 'md-checkbox-group',
  },
})
export class CheckboxGroupComponent {
  constructor() {}
}
