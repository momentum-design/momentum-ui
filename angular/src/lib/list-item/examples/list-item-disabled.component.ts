import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-list-item-disabled',
  template: `
    <div class="medium-4 columns">
        <cui-list>
            <div cui-list-item label='List Item A'></div>
            <div cui-list-item label='List Item B' [disabled]="true"></div>
        </cui-list>
    </div>
  `,
  styles: []
})
export class ListItemDisabledComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
