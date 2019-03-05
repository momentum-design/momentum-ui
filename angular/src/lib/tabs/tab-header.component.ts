import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cui-tab-header',
  template: `
      {{ heading }}
      <div *ngIf='subHeading'>{{ subHeading }}</div>
  `,
  styles: []
})
export class TabHeaderComponent implements OnInit {
  /** @prop TabHeader text */
  @Input() public heading: string;
  /** @prop Subheader text | '' */
  @Input() public subHeading: string = '';

  constructor() { }

  ngOnInit() {
  }

}

/**
 * @component tab-header
 * @section ng-content
 * @angular
 *
<cui-tabs>
    <cui-tab-list>
        <cui-tab class='helloClass'>A</cui-tab>
        <cui-tab>B</cui-tab>
    </cui-tab-list>
</cui-tabs>
 */

/**
 * @component tab-header
 * @section heading
 * @angular
 *
<cui-tab-header heading='test'></cui-tab-header>
 */

/**
 * @component tab-header
 * @section heading
 * @angular
 *
<cui-tab-header heading='test' subHeading='sub'></cui-tab-header>
 */
