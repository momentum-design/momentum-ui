import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-list-item-type',
  template: `
    <div class="medium-4 columns">
        <cui-list>
            <b>small type</b>
            <div cui-list-item label='List Item A' type='small'></div>
            <b>default type</b>
            <div cui-list-item label='List Item B'></div>
            <b>large type</b>
            <div cui-list-item label='List Item B' type='large'></div>
            <b>xlarge type</b>
            <div cui-list-item label='List Item B' type='xlarge'></div>
        </cui-list>
    </div>
  `,
  styles: []
})
export class ListItemTypeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
