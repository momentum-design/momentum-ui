import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-select-multi',
  template: `
    <div class="medium-8 columns">
      <md-select defaultValue="Select an option" [isMulti]="true">
        <div md-select-option class="select-option-custom-class" label="first option"></div>
        <div md-select-option label="second option"></div>
      </md-select>
    </div>
  `,
  styles: []
})
export class ExampleSelectMultiComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
