import { Component, OnInit, Input, HostBinding, Output, EventEmitter, HostListener } from '@angular/core';
import { uniqueId } from 'lodash';

@Component({
  selector: 'a[cui-list-item], div[cui-list-item]',
  exportAs: 'cuiListItem',
  template: `
      <div *ngIf="label; else content">{{label}}</div>

      <ng-template #content>
        <ng-content></ng-content>
      </ng-template>
  `
})
export class ListItemComponent implements OnInit {

  constructor() { }

  /** @option Active prop to help determine styles | false */
  @Input() active = false;
  /** @option class Optional css class name | '' */
  @Input() class = '';
  /** @option Disabled attribute for ListItem to determine styles | false */
  @Input() disabled = false;
  /** @option Sets ListItem id | null */
  @HostBinding('attr.id') @Input() id: string = uniqueId('cui-list-item-');
  /** @option Determines if ListItem is clickable | false */
  @Input() isReadOnly = false;
  /** @option ListItem label text | '' */
  @Input() label = '';
  /** @option external link associated input | '' */
  @HostBinding('attr.href') @Input() link = '';
  /** @option ListItem ref name | 'navLink' */
  @HostBinding('attr.role') @Input() role = 'listItem';
  /** @option Prop that controls whether to show separator or not | false */
  @Input() separator = false;
  /** @option ListItem Title | '' */
  @Input() title = '';
  /** @option ListItem size | '' */
  @Input() type = '';

  @Output() selected: EventEmitter<any> = new EventEmitter();

  @HostBinding('class') get className(): string {
    return 'cui-list-item' +
    `${(this.type && ` cui-list-item--${this.type}`) || ''}` +
    `${(this.active && ` active`) || ''}` +
    `${(this.disabled && ` disabled`) || ''}` +
    `${(this.isReadOnly && ` cui-list-item--read-only`) || ''}` +
    `${(this.separator && ` cui-list-item--separator`) || ''}` +
    `${(this.class && ` ${this.class}`) || ''}`;
  }

  @HostBinding('attr.title') get theTitle() { return this.title || this.label; }

  @HostListener('click', ['$event.target']) handleClick = listItem => {
    if (this.isReadOnly) {
      event.stopImmediatePropagation();
    }
   }

  ngOnInit() {
    if (this.type && !this.isTypeOptionValid()) {
      throw new Error(`cui-list-item: ListItem type option must be one of the following:
        small, large, xlarge, space, header, 36, 52, 60`);
    }
  }

  private isTypeOptionValid = () => (
    ['', 'small', 'large', 'xlarge', 'space', 'header', 36, 52, 60].includes(this.type)
  )
}

/**
 * @component list-item
 * @section default
 * @angular
 *
  <div class="medium-4 columns">
    <cui-list>
      <div cui-list-item label='List Item A'></div>
      <a cui-list-item label='List Item B' link='javascript:void(0)'></a>
    </cui-list>
  </div>
 */

/**
 * @component list-item
 * @section disabled
 * @angular
 *
  <div class="medium-4 columns">
    <cui-list>
      <div cui-list-item label='List Item A'></div>
      <div cui-list-item label='List Item B' [disabled]=true></div>
    </cui-list>
  </div>
 */

/**
 * @component list-item
 * @section IsReadOnly
 * @angular
 *
  <div class="medium-4 columns">
    <cui-list>
      <div cui-list-item label='List Item A'></div>
      <div cui-list-item label='List Item B' [isReadOnly]=true></div>
    </cui-list>
  </div>
 */

 /**
 * @component list-item
 * @section link
 * @angular
 *
  <div class="medium-4 columns">
    <cui-list>
      <div cui-list-item label='List Item A'></div>
      <div cui-list-item label='List Item B' link='https://www.google.com'></div>
    </cui-list>
  </div>
 */

/**
 * @component list-item
 * @section separator
 * @angular
 *
  <div class="medium-4 columns">
    <cui-list>
      <div cui-list-item label='List Item A'></div>
      <div cui-list-item label='List Item B' [separator]=true></div>
    </cui-list>
  </div>
 */

/**
 * @component list-item
 * @section title
 * @angular
 *
  <div class="medium-4 columns">
    <cui-list>
      <div cui-list-item label='List Item A'></div>
      <div cui-list-item label='List Item B' title='my custom title'></div>
    </cui-list>
  </div>
 */

/**
 * @component list-item
 * @section type
 * @angular
 *
  <div class="medium-4 columns">
    <cui-list>
      <div cui-list-item label='List Item A' type='small'></div>
      <div cui-list-item label='List Item B'></div>
      <div cui-list-item label='List Item B' type='large'></div>
      <div cui-list-item label='List Item B' type='xlarge'></div>
    </cui-list>
  </div>
 */
