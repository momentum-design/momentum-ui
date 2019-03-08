import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-list-type',
  template: `
    <div class="medium-4 columns">
        <b>small type</b>
        <cui-list type="small">
            <div cui-list-item label='List Item A'></div>
            <div cui-list-item label='List Item B'></div>
        </cui-list>
        <b>default type</b>
        <cui-list>
            <div cui-list-item label='List Item A'></div>
            <div cui-list-item label='List Item B'></div>
        </cui-list>
        <b>large type</b>
        <cui-list type="large">
            <div cui-list-item label='List Item A'></div>
            <div cui-list-item label='List Item B'></div>
        </cui-list>
        <b>xlarge type</b>
        <cui-list type="xlarge">
            <div cui-list-item label='List Item A'></div>
            <div cui-list-item label='List Item B'></div>
        </cui-list>
    </div>
  `,
  styles: []
})
export class ListTypeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
