import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-select-ngModel',
  template: `
    <div class="medium-8 columns">
      <cui-select
        defaultValue="Select an option"
        buttonClass="my-custom-button-class"
        [ngClass]="'angular-custom-class'"
        [(ngModel)]="selected"
      >
        <div cui-select-option class="custom-class-prop" label="first option"></div>
        <div cui-select-option label="second option"></div>
        <div cui-select-option label="third option"></div>
      </cui-select>
      <div>
        <p>you selected: {{selected}}</p>
      </div>
  </div>
  `,
  styles: []
})
export class ExampleSelectNgModelComponent implements OnInit {
  selected = '';

  constructor() { }

  ngOnInit() { }

  onSelect (event) {
    console.info('custom onSelect is working', event);
  }
}
