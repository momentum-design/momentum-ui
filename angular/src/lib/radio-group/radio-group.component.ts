import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'md-radio-group',
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
    class: 'md-radio-group',
  },
})
export class RadioGroupComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
