import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-list-wrap',
  template: `
    <div class="medium-4 columns">
        <md-list [wrap]="true" tabType="horizontal">
            <div md-list-item label='List Item A'></div>
            <div md-list-item label='List Item B'></div>
            <div md-list-item label='List Item C'></div>
            <div md-list-item label='List Item D'></div>
            <div md-list-item label='List Item E'></div>
            <div md-list-item label='List Item F'></div>
        </md-list>
    </div>
  `,
  styles: []
})
export class ListWrapComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
