import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-list-tab-type',
  template: `
    <div class="medium-4 columns">
        <b>Vertical TabType</b>
        <cui-list tabType="vertical">
            <div cui-list-item label='List Item A'></div>
            <div cui-list-item label='List Item B'></div>
        </cui-list>

        <b>Horizontal TabType</b>
        <cui-list tabType="horizontal">
            <div cui-list-item label='List Item A'></div>
            <div cui-list-item label='List Item B'></div>
        </cui-list>
    </div>
  `,
  styles: []
})
export class ListTabTypeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
