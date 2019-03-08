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
        <div cui-list-item label='List Item C' [isReadOnly]="true"></div>
        <b>separator</b>
        <div cui-list-item label='List Item D' [separator]="true"></div>
        <b>title</b>
        <div cui-list-item label='List Item E' title="myTitle"></div>
        <b>focus</b>
        <div cui-list-item label='List Item E' [focus]="true"></div>
        <b>active</b>
        <div cui-list-item label='List Item E' [active]="true"></div>
        <b>selected</b>
        <div cui-list-item label='List Item E' [selected]="true"></div>
        <b>classes</b>
        <div cui-list-item label='List Item E' [ngClass]="'my-ng-class'" class="custom-class"></div>
      </cui-list>
    </div>
  `,
  styles: []
})
export class ListItemDefaultComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
