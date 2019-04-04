/** @component list */

import {
  Component,
  OnInit,
  Input,
  HostBinding,
  QueryList,
  ContentChildren,
  HostListener,
  OnChanges,
  OnDestroy,
  Output,
  EventEmitter,
  NgZone,
  ChangeDetectorRef,
  AfterContentInit,
} from '@angular/core';
import uniqueId from 'lodash-es/uniqueId';
import { ListItemComponent, OptionSelectionChange } from '../list-item';
import { Observable } from 'rxjs';
import { defer } from 'rxjs/observable/defer';
import { merge } from 'rxjs/observable/merge';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cui-list',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
})
export class ListComponent implements OnInit, AfterContentInit {

  private Subscription;

  constructor(
    private cd: ChangeDetectorRef,
    private _ngZone: NgZone) {

    this.optionSelectionChanges.subscribe(event => {
      this._onSelect(event.source);
    });
  }

  /** @option class optional css class name | '' */
  @Input() class = '';
  /** @option Optional ID value of List | null */
  @HostBinding('id') @Input() id: string = uniqueId('cui-list-');
  /** @option itemRole prop to set child roles | 'listItem' */
  @Input() itemRole = 'listItem';
  /** @option Callback function invoked by user selecting an interactive item within list | null */
  @Output() select = new EventEmitter();
  /** @option Sets the ARIA role for the Nav, in the context of a TabContainer | 'list' */
  @HostBinding('attr.role') @Input() role: string = 'list';
  /** @option Sets the orientation of the List | 'vertical' */
  @Input() tabType = 'vertical';
  /** @option Type sets List size | null */
  @Input() type = null;
  /** @option Wrap prop type to wrap items to next row */
  @Input() wrap = false;

  @HostBinding('class') get className(): string {
    return (
      'cui-list' +
      ` cui-list--${this.tabType}` +
      ` cui-list${(this.wrap && `--wrap`) || ''}` +
      `${(this.class && ` ${this.class}`) || ''}`
    );
  }

  @ContentChildren(ListItemComponent) listItems: QueryList<ListItemComponent>;

  /** Combined stream of all of the child options' change events. */
  readonly optionSelectionChanges: Observable<OptionSelectionChange> = defer(() => {
    if (this.listItems) {
      return merge(...this.listItems.map(option => option.selectionChange));
    }
    return this._ngZone.onStable.asObservable()
      .pipe(take(1), switchMap(() => this.optionSelectionChanges));
  }) as unknown as Observable<OptionSelectionChange>;

  ngOnInit() {
    if (this.tabType && !this._isTabTypeOptionValid()) {
      throw new Error(`cui-list: List tabType option must be one of the following:
        vertical, horizontal`);
    }
    if (this.type && !this._isTypeOptionValid()) {
      throw new Error(`cui-list: List type option must be one of the following:
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
      listItem.id = uniqueId(`${this.id}__list-item-`);
    });

    this.cd.detectChanges();
  }

  /** Invoked when an option is clicked. */
  private _onSelect(option: ListItemComponent): void {
    if (this.select) {
      return this.select.emit(option);
    }
  }

  private _isTabTypeOptionValid = () => (
    ['vertical', 'horizontal'].includes(this.tabType)
  )

  private _isTypeOptionValid = () => (
    ['small', 'large', 'space', 'xlarge'].includes(this.type)
  )
}
