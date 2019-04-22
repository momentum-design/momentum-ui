import { Component } from '@angular/core';

@Component({
  selector: 'example-search-input-pill',
  template: `
    <md-search-input
      [(ngModel)]="pillValue"
      name="testName"
      htmlId="pillSearchInput"
      type="pill"
      [clear]="true"
      inputSize="small-5"
    >
    </md-search-input>
  `,
  styles: [],
})
export class SearchInputPillComponent {
  constructor() {}
  pillValue: string = 'Pill Search Text';
}
