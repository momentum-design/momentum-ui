import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-list-item-disabled',
  template: `
    <div class="medium-4 columns">
        <md-list>
            <div md-list-item label='List Item A'></div>
            <div md-list-item label='List Item B' [disabled]="true"></div>
        </md-list>
    </div>
  `,
  styles: []
})
export class ListItemDisabledComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
