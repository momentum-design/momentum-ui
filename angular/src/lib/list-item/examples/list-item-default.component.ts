import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-list-item-default',
  template: `
    <div class="medium-4 columns">
      <cui-list>
        <b>default</b>
        <div cui-list-item label='List Item A'></div>
        <b>default anchor</b>
        <a cui-list-item label='List Item B' link='https://www.google.com'></a>
        <b>isReadOnly</b>
        <div cui-list-item label='List Item A' isReadOnly="{{true}}"></div>
        <b>separator</b>
        <div cui-list-item label='List Item A' separator="{{true}}"></div>
        <b>title</b>
        <div cui-list-item label='List Item A' title="myTitle"></div>
      </cui-list>
    </div>
  `,
  styles: []
})
export class ListItemDefaultComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
