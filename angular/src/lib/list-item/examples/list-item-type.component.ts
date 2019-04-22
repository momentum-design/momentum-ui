import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-list-item-type',
  template: `
    <div class="medium-4 columns">
        <md-list>
            <b>small type</b>
            <div md-list-item label='List Item A' type='small'></div>
            <b>default type</b>
            <div md-list-item label='List Item B'></div>
            <b>large type</b>
            <div md-list-item label='List Item B' type='large'></div>
            <b>xlarge type</b>
            <div md-list-item label='List Item B' type='xlarge'></div>
        </md-list>
    </div>
  `,
  styles: []
})
export class ListItemTypeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
