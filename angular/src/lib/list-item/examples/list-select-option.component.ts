import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-list-select-option',
  template: `
    <div class="medium-4 columns">
      <div md-select-option class="custom-class-prop" label="first option"></div>
      <div md-select-option label="second option"></div>
    </div>
  `,
  styles: []
})
export class ListSelectOptionComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
