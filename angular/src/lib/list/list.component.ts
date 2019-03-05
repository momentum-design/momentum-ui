import { Component, OnInit, Input, HostBinding,
  QueryList, ContentChildren, HostListener, OnChanges, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { uniqueId } from 'lodash';
import { ListItemComponent } from '../list-item';

@Component({
  selector: 'cui-list',
  template: `
    <ng-content></ng-content>
    `,
  styles: []
})
export class ListComponent implements OnInit, OnChanges, AfterContentInit {

  isActive = true;

  constructor(private cd: ChangeDetectorRef) {}

  /** @option class optional css class name | '' */
  @Input() class = '';
  /** @option Optional ID value of List | null */
  @HostBinding('id') @Input() id: string = uniqueId('cui-list-');
  /** @option Optional tabType prop type to manually set child role | 'listItem' */
  @Input() itemRole = 'listItem';
  /** @option Sets the ARIA role for the Nav, in the context of a TabContainer | 'list' */
  @HostBinding('attr.role') @Input() role: string = 'list';
  /** @option Sets the orientation of the List | 'vertical' */
  @Input() tabType = 'vertical';
  /** @option Sets List size | null */
  @Input() type = null;
  /** @option Optional wrap prop type to wrap items to next row */
  @Input() wrap = false;

  @HostBinding('class') get className(): string {
    return 'cui-list' +
    ` cui-list--${this.tabType}` +
    ` cui-list${this.wrap && `--wrap` || ''}` +
    `${(this.class && ` ${this.class}`) || ''}`;
  }

  @ContentChildren(ListItemComponent) listItems: QueryList<ListItemComponent>;

  ngOnInit() {
    console.log(this.tabType);
    console.log(this.isTabTypeOptionValid());
    if (this.tabType && !this.isTabTypeOptionValid()) {
      throw new Error(`cui-list: List tabType option must be one of the following:
        vertical, horizontal`);
    }
    if (this.type && !this.isTypeOptionValid()) {
      throw new Error(`cui-list: List type option must be one of the following:
        small, large, space, xlarge`);
    }
  }

  ngAfterContentInit() {
    // set up listItems children with props
    this.listItems.forEach((listItem) => {
      if (this.type) { listItem.type = this.type; }
      listItem.role = this.itemRole;
      listItem.id = uniqueId(`${this.id}__list-item-`);
    });

    this.cd.detectChanges();
  }

  ngOnChanges(changes) {
    console.log('ngOnChanges');
    console.log(changes);
  }

  @HostListener('click', ['$event.target']) handleClick = listItem => {
   this.updateSelected(listItem.id);
  }

  updateSelected(selectedId) {
    this.listItems.forEach((listItem) => {
      listItem.active = !listItem.isReadOnly && (listItem.id === selectedId);
    });

    this.cd.detectChanges();
  }

  private isTabTypeOptionValid = () => (
    ['vertical', 'horizontal'].includes(this.tabType)
  )

  private isTypeOptionValid = () => (
    ['small', 'large', 'space', 'xlarge'].includes(this.type)
  )
}

/**
 * @component list
 * @section default
 * @angular
 *
<div class="medium-4 columns">
  <cui-list">
        <div cui-list-item label='List Item A'></div>
        <div cui-list-item label='List Item B'></div>
    </cui-list>
</div>
 */

 /**
 * @component list
 * @section tabType type
 * @angular
 *
<div class="medium-4 columns">
  <cui-list" tabType="vertical">
        <div cui-list-item label='List Item A'></div>
        <div cui-list-item label='List Item B'></div>
    </cui-list>
    <cui-list" tabType="horizontal">
        <div cui-list-item label='List Item A'></div>
        <div cui-list-item label='List Item B'></div>
    </cui-list>
</div>
 */

  /**
 * @component list
 * @section type
 * @angular
 *
<div class="medium-4 columns">
  <cui-list" type="small">
        <div cui-list-item label='List Item A'></div>
        <div cui-list-item label='List Item B'></div>
    </cui-list>
    <cui-list">
        <div cui-list-item label='List Item A'></div>
        <div cui-list-item label='List Item B'></div>
    </cui-list>
    <cui-list" type="large">
        <div cui-list-item label='List Item A'></div>
        <div cui-list-item label='List Item B'></div>
    </cui-list>
    <cui-list" type="xlarge">
        <div cui-list-item label='List Item A'></div>
        <div cui-list-item label='List Item B'></div>
    </cui-list>
</div>
 */

   /**
 * @component list
 * @section wrap
 * @angular
 *
<div class="medium-4 columns">
  <cui-list" [wrap]=true>
        <div cui-list-item label='List Item A'></div>
        <div cui-list-item label='List Item B'></div>
    </cui-list>
</div>
 */
