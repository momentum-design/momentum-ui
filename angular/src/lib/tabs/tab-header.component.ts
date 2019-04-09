/** @component tab */

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cui-tab-header',
  template: `
    {{ heading }}
    <div *ngIf="subHeading">{{ subHeading }}</div>
  `,
  styles: [],
})
export class TabHeaderComponent implements OnInit {
  /** @option TabHeader text */
  @Input() public heading: string;
  /** @option Subheader text | '' */
  @Input() public subHeading: string = '';

  constructor() {}

  ngOnInit() {}
}
