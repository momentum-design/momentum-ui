import { Component, OnInit, Input, HostBinding, HostListener, ElementRef,
  Output, EventEmitter, AfterViewInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Highlightable, ListKeyManagerOption } from '@angular/cdk/a11y';
import { uniqueId } from 'lodash';

export class OptionSelectionChange {
  constructor(public source: ListItemComponent) {}
}

@Component({
  selector: 'a[cui-list-item], div[cui-list-item], div[cui-select-option]',
  exportAs: 'cuiListItem',
  template: `
      <ng-container *ngIf="isSelectOption">
        <ng-container *ngIf="!isMulti">
          <cui-list-item-section key="child-0" position='center'>
              <ng-container *ngIf="label; else content">{{label}}</ng-container>
              <ng-template #content>
                  <ng-content></ng-content>
              </ng-template>
          </cui-list-item-section>
          <cui-list-item-section key="child-1" position='right'>
              <cui-icon *ngIf="selected" name="check_20" color="blue"></cui-icon>
          </cui-list-item-section>
        </ng-container>

        <ng-container *ngIf="isMulti">
          <cui-checkbox
            name="{{id}}-checkbox"
            value="{{label}}"
            label="{{label}}"
            [(checkStatus)]="checkStatus"
            htmlId="{{id}}-checkbox">
          </cui-checkbox>
        </ng-container>
      </ng-container>

      <ng-container *ngIf="!isSelectOption">
        <div *ngIf="label; else content">{{label}}</div>

        <ng-template #content>
          <ng-content></ng-content>
        </ng-template>
      </ng-container>
  `
})
export class ListItemComponent implements Highlightable, OnInit, AfterViewInit, AfterContentChecked {
  checkedValues: string[] = [''];
  checkStatus: boolean;

  readonly isSelectOption: boolean = this._hasHostAttributes('cui-select-option');

  constructor(
    private el: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef
    ) { }

  /** @option Active prop to determine styles | false */
  @Input() active = false;
  /** @option selected prop to determine styles | false */
  @Input() selected = false;
  /** @option class Optional css class name | '' */
  @Input() class = '';
  /** @option Disabled attribute for ListItem to determine styles | false */
  @Input() disabled = false;
  /** @option Sets ListItem to a focus state | false */
  @Input() focus = false;
  /** @option Sets ListItem id | null */
  @HostBinding('attr.id') @Input() id: string = uniqueId('cui-list-item-');
  /** @option Determines if is part of a multi select | false */
  @Input() isMulti = false;
  /** @option Determines if ListItem is clickable | false */
  @Input() isReadOnly = false;
  /** @option ListItem label text | '' */
  @Input() label = null;
  /** @option external link associated input | '' */
  @Input() link = '';
  /** @option ListItem ref name | 'navLink' */
  @Input() role = null;
  @HostBinding('attr.role') get myRole(): string {
    return this.role || this.isSelectOption ? 'option' : 'listItem';
  }
  /** @option Prop that controls whether to show separator or not | false */
  @Input() separator = false;
  /** @option ListItem Title | '' */
  @Input() title = '';
  /** @option ListItem size | '' */
  @Input() type = '';

  @Output() selectionChange = new EventEmitter<OptionSelectionChange>();

  @HostBinding('attr.href') get myHref(): string {
    return (this.link && this._getHostElement().localName === 'a') ? this.link : null;
  }

  @HostBinding('class') get className(): string {
    return 'cui-list-item' +
    `${(this.type && ` cui-list-item--${this.type}`) || ''}` +
    `${(this.active && ` active`) || ''}` +
    `${(this.focus && ` focus`) || ''}` +
    `${(this.disabled && ` disabled`) || ''}` +
    `${(this.isReadOnly && ` cui-list-item--read-only`) || ''}` +
    `${(this.separator && ` cui-list-item--separator`) || ''}` +
    `${(this.isSelectOption && ` cui-select-option`) || ''}` +
    `${(this.class && ` ${this.class}`) || ''}`;
  }

  @HostBinding('attr.title') get theTitle() { return this.title || this.label; }

  @HostListener('click', ['$event']) handleClick = event => {
    console.log('[list-item]: click event');
    console.log(event);
    if (this.isReadOnly) {
      event.stopImmediatePropagation();
    } else {
      this._selectViaInteraction();
    }
   }

  ngOnInit() {
    if (this.type && !this._isTypeOptionValid()) {
      throw new Error(`cui-list-item: ListItem type option must be one of the following:
        small, large, xlarge, space, header, 36, 52, 60`);
    }
  }

  ngAfterViewInit () {
    if (!this.label) {
      throw new Error('cui-list-item: Label property is required');
    }
  }

  ngAfterContentChecked () {}

  select(): void {
    if (!this.selected) {
      this.selected = true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }

  /** Deselects the option. */
  deselect(): void {
    if (this.selected) {
      this.selected = false;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }

  // Highlightable Interface methods
  setActiveStyles(): void {
    console.log('setActiveStyles');
    this.focus = true;
  }
  setInactiveStyles(): void {
    console.log('setInactiveStyles');
    this.focus = false;
  }
  getLabel?(): string {
    return this.label;
  }

  _selectViaInteraction(): void {
    if (!this.disabled) {
      this.selected = !this.selected;
      this.checkStatus = this.selected;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }

  _emitSelectionChangeEvent () {
    return this.selectionChange.emit(new OptionSelectionChange(this));
  }

  _isTypeOptionValid = () => (
    ['', 'small', 'large', 'xlarge', 'space', 'header', 36, 52, 60].includes(this.type)
  )

  _getHostElement() {
    return this.el.nativeElement;
  }

  /** Gets whether the button has one of the given attributes. */
  _hasHostAttributes(...attributes: string[]) {
    return attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
  }
}
