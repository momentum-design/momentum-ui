import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-list-default',
  template: `
    <div class="medium-4 columns">
      <md-list
        [ngClass]="'my-ng-class'"
        class="custom-class"
        (select)="onSelect($event)">
        <div md-list-item label='List Item A'></div>
        <div md-list-item label='List Item B'></div>
      </md-list>
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
