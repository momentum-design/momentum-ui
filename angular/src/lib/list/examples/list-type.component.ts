import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-list-type',
  template: `
    <div class="medium-4 columns">
        <b>small type</b>
        <md-list type="small">
            <div md-list-item label='List Item A'></div>
            <div md-list-item label='List Item B'></div>
        </md-list>
        <b>default type</b>
        <md-list>
            <div md-list-item label='List Item A'></div>
            <div md-list-item label='List Item B'></div>
        </md-list>
        <b>large type</b>
        <md-list type="large">
            <div md-list-item label='List Item A'></div>
            <div md-list-item label='List Item B'></div>
        </md-list>
        <b>xlarge type</b>
        <md-list type="xlarge">
            <div md-list-item label='List Item A'></div>
            <div md-list-item label='List Item B'></div>
        </md-list>
    </div>
  `,
  styles: []
})
export class ListTypeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
