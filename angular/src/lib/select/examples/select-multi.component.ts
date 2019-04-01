import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-select-multi',
  template: `
    <div class="medium-8 columns">
      <cui-select defaultValue="Select an option" [isMulti]="true">
        <div cui-select-option class="select-option-custom-class" label="first option"></div>
        <div cui-select-option label="second option"></div>
      </cui-select>
    </div>
  `,
  styles: []
})
export class ExampleSelectMultiComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
