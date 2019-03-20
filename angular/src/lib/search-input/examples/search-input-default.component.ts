import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-search-input-default',
  template: `
    <cui-search-input
      [(ngModel)]="normalValue"
      name='testName'
      htmlId='defaultSearchInput'
      [clear]="true"
      inputSize='small-5'>
    </cui-search-input>
  `,
  styles: []
})
export class SearchInputDefaultComponent{
  constructor() {}
  normalValue: string = 'Normal Search Text'
}