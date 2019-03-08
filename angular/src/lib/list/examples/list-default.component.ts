import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-list-default',
  template: `
    <div class="medium-4 columns">
      <cui-list (select)="onSelect($event)">
        <div cui-list-item label='List Item A'></div>
        <div cui-list-item label='List Item B'></div>
      </cui-list>
    </div>
  `,
  styles: []
})
export class ListDefaultComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  onSelect (event) {
    console.info('custom onSelect working');
  }
}
