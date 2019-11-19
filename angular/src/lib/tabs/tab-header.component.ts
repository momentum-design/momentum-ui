/** @component tab */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'md-tab-header',
  template: `
    {{ heading }}
    <div *ngIf="subHeading" class="md-tab-header__subheading">{{ subHeading }}</div>
  `,
  styles: [],
})
export class TabHeaderComponent {
  /** @prop TabHeader text */
  @Input() public heading: string;
  /** @prop Subheader text | '' */
  @Input() public subHeading: string = '';
}
