import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-list-tab-type',
  template: `
    <div class="medium-4 columns">
        <b>Vertical TabType</b>
        <md-list tabType="vertical">
            <div md-list-item label='List Item A'></div>
            <div md-list-item label='List Item B'></div>
        </md-list>

        <b>Horizontal TabType</b>
        <md-list tabType="horizontal">
            <div md-list-item label='List Item A'></div>
            <div md-list-item label='List Item B'></div>
        </md-list>
    </div>
  `,
  styles: []
})
export class ListTabTypeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
