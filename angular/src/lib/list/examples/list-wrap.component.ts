import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-list-wrap',
  template: `
    <div class="medium-4 columns">
        <cui-list wrap='{{true}}' tabType="horizontal">
            <div cui-list-item label='List Item A'></div>
            <div cui-list-item label='List Item B'></div>
            <div cui-list-item label='List Item C'></div>
            <div cui-list-item label='List Item D'></div>
            <div cui-list-item label='List Item E'></div>
            <div cui-list-item label='List Item F'></div>
        </cui-list>
    </div>
  `,
  styles: []
})
export class ListWrapComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
