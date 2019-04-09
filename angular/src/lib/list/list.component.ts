/** @component list */

import {
  Component,
  OnInit,
  Input,
  HostBinding,
  QueryList,
  ContentChildren,
  ChangeDetectorRef,
  AfterContentInit,
  Output,
  EventEmitter,
  NgZone,
  ElementRef
} from '@angular/core';
import { uniqueId } from 'lodash';
import { ListItemComponent, OptionSelectionChange } from '../list-item';
import { Observable, defer, merge } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'md-list',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
  host: {
    'class': 'md-list',
    '[class.md-list--wrap]': 'wrap'
  }
})
export class ListComponent implements OnInit, AfterContentInit {

  private Subscription;

  constructor(
    private cd: ChangeDetectorRef,
    private _ngZone: NgZone,
    private el: ElementRef) {

    this.optionSelectionChanges.subscribe(event => {
      this._onSelect(event.source);
    });
  }

  /** @option Optional ID value of List | null */
  @HostBinding('id') @Input() id: string = uniqueId('md-list-');
  /** @option itemRole prop to set child roles | 'listItem' */
  @Input() itemRole = 'listItem';
  /** @option Callback function invoked by user selecting an interactive item within list | null */
  @Output() select = new EventEmitter();
  /** @option Sets the ARIA role for the Nav, in the context of a TabContainer | 'list' */
  @HostBinding('attr.role') @Input() role: string = 'list';
  /** @option Sets the orientation of the List | 'vertical' */
  private _tabType: string = 'vertical';
  @Input()
  set tabType(tabType: string) {
    if (this._tabType) {
      this.el.nativeElement.classList.remove(`md-list--${this._tabType}`);
    }
    this.el.nativeElement.classList.add(`md-list--${tabType}`);
    this._tabType = tabType;
  }
  /** @option Type sets List size | null */
  @Input() type = null;
  /** @option Wrap prop type to wrap items to next row */
  @Input() wrap = false;

  @ContentChildren(ListItemComponent) listItems: QueryList<ListItemComponent>;

  /** Combined stream of all of the child options' change events. */
  readonly optionSelectionChanges: Observable<OptionSelectionChange> = defer(() => {
    if (this.listItems) {
      return merge(...this.listItems.map(option => option.selectionChange));
    }

    return this._ngZone.onStable.asObservable()
      .pipe(take(1), switchMap(() => this.optionSelectionChanges));
  }) as Observable<OptionSelectionChange>;

  ngOnInit() {
    if (this._tabType && !this._isTabTypeOptionValid()) {
      throw new Error(`md-list: List tabType option must be one of the following:
        vertical, horizontal`);
    }
    if (this.type && !this._isTypeOptionValid()) {
      throw new Error(`md-list: List type option must be one of the following:
        small, large, space, xlarge`);
    }
  }

  ngAfterContentInit() {
    // set up listItems children with props
    this.listItems.forEach(listItem => {
      if (this.type) {
        listItem.type = this.type;
      }
      listItem.role = this.itemRole;
    });

    this.cd.detectChanges();
  }

  /** Invoked when an option is clicked. */
  private _onSelect(option: ListItemComponent): void {
    if (this.select) {
      this.listItems.forEach(listItem => {
        if (listItem !== option) {
          listItem.active = false;
        }
      });
      option.active = true;
      return this.select.emit(option);
    }
  }

  private _isTabTypeOptionValid = () => (
    ['vertical', 'horizontal'].includes(this._tabType)
  )

  private _isTypeOptionValid = () => (
    ['small', 'large', 'space', 'xlarge'].includes(this.type)
  )
}
