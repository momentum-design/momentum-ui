import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'cui-list-item-section',
  template: `
    <ng-content></ng-content>
  `,
  styles: []
})
export class ListItemSectionComponent implements OnInit {

  constructor() { }

  /** @option position Determine the ListItemSection's position | 'center' */
  @Input() position = 'center';
  /** @option class Optional css class name | '' */
  @Input() class = '';

  @HostBinding('class') get className(): string {
    return `cui-list-item__${this.position}` +
      `${(this.class && ` ${this.class}`) || ''}`;
  }

  ngOnInit() {
    if (this.position && !this.isValidPosition()) {
      throw new Error(`cui-list-item-section: ListItemSection position option
        must be one of the following: left, center, right, center-align`);
    }
  }

  private isValidPosition = () => (
    ['left', 'center', 'right', 'center-align'].includes(this.position)
  )
}

/**
* @component list-item-section
* @section default
* @angular
*
<div>
  <cui-list-item-section>Section</cui-list-item-section>
</div>
*/

/**
 * @component list-item-section
 * @section position
 * @angular
 *
<div>
  <cui-list-item-section position="left">Section</cui-list-item-section>
</div>
 */
