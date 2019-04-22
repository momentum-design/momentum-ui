import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-select-default',
  template: `
    <div class="medium-8 columns">
      <md-select
        defaultValue="Select an option"
        (select)="onSelect($event)"
        buttonClass="my-custom-button-class"
        [ngClass]="'angular-custom-class'"
      >
        <div md-select-option class="custom-class-prop" label="first option"></div>
        <div md-select-option label="second option"></div>
      </md-select>
  </div>
  `,
  styles: []
})
export class ExampleSelectDefaultComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  onSelect (event) {
    console.info('custom onSelect is working');
  }
}
