import {
  Component,
  OnInit,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  AfterViewInit
} from '@angular/core';
import {ENTER, SPACE, hasModifierKey} from '@angular/cdk/keycodes';
import { Highlightable } from '@angular/cdk/a11y';
import { uniqueId } from 'lodash';

export class OptionSelectionChange {
  constructor(
    public source: ListItemComponent,
    public isUserInput = false
  ) {}
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
  `,
  host: {
    'class': 'cui-list-item',
    '[class.cui-list-item--read-only]': 'isReadOnly',
    '[class.cui-list-item--separator]': 'separator',
    '[class.cui-select-option]': 'isSelectOption',
    '[class.active]': 'active',
    '[class.focus]': 'focus',
    '[class.disabled]': 'disabled',
  }
})
export class ListItemComponent implements Highlightable, OnInit, AfterViewInit {
  checkedValues: string[] = [''];
  checkStatus: boolean;

  readonly isSelectOption: boolean = this._hasHostAttributes('cui-select-option');

  constructor(public el: ElementRef) { }

  /** @prop Active prop to determine styles | false */
  @Input() active = false;
  /** @prop selected prop to determine styles | false */
  @Input() selected = false;
  /** @prop Disabled attribute for ListItem to determine styles | false */
  @Input() disabled = false;
  /** @prop Sets ListItem to a focus state | false */
  @Input() focus = false;
  /** @prop Sets ListItem id | null */
  @HostBinding('attr.id') @Input() id: string = uniqueId('cui-list-item-');
  /** @prop Determines if is part of a multi select | false */
  @Input() isMulti = false;
  /** @prop Determines if ListItem is clickable | false */
  @Input() isReadOnly = false;
  /** @prop ListItem text and form value | '' */
  @Input() label = null;
  /** @prop external link associated input | '' */
  @Input() link = '';
  /** @prop ListItem ref name | 'navLink' */
  @Input() role = null;
  @HostBinding('attr.role') get myRole(): string {
    return this.role || this.isSelectOption ? 'option' : 'listItem';
  }
  /** @prop Controls whether to show separator or not | false */
  @Input() separator = false;
  /** @prop ListItem Title | '' */
  @Input() title = '';
  /** @prop ListItem size | '' */
  private _type: string = null;
  @Input()
  set type(type: string) {
    if (this._type) {
      this.el.nativeElement.classList.remove(`cui-list-item--${this._type}`);
    }
    this.el.nativeElement.classList.add(`cui-list-item--${type}`);
    this._type = type;
  }

  @Output() selectionChange = new EventEmitter<OptionSelectionChange>();

  @HostBinding('attr.href') get myHref(): string {
    return (this.link && this._getHostElement().localName === 'a') ? this.link : null;
  }

  @HostBinding('attr.title') get theTitle() {
    return this.title || this.label;
  }

  @HostListener('click', ['$event']) handleClick = event => {
    if (this.isReadOnly) {
      event.stopImmediatePropagation();
    } else {
      this._selectViaInteraction();
    }
  }

  @HostListener('keydown', ['$event']) handleKeydown = event => {
    if ((event.keyCode === ENTER || event.keyCode === SPACE) && !hasModifierKey(event)) {
      this._selectViaInteraction();
      event.preventDefault();
    }
  }

  ngOnInit() {
    if (this._type && !this._isTypeOptionValid()) {
      throw new Error(`cui-list-item: ListItem type option must be one of the following:
        small, large, xlarge, space, header, 36, 52, 60`);
    }
  }

  ngAfterViewInit () {
    if (!this.label) {
      throw new Error('cui-list-item: Label property is required');
    }
  }

  select(): void {
    if (!this.selected) {
      this.selected = true;
      this._emitSelectionChangeEvent();
    }
  }

  /** Deselects the option. */
  deselect(): void {
    if (this.selected) {
      this.selected = false;
      this._emitSelectionChangeEvent();
    }
  }

  // Highlightable Interface methods
  setActiveStyles(): void {
    this.focus = true;
  }
  setInactiveStyles(): void {
    this.focus = false;
  }
  getLabel?(): string {
    return this.label;
  }

  _selectViaInteraction(): void {
    if (!this.disabled) {
      this.selected = !this.selected;
      this.checkStatus = this.selected;
      this._emitSelectionChangeEvent(true);
    }
  }

  _emitSelectionChangeEvent (isUserInput = false) {
    return this.selectionChange.emit(new OptionSelectionChange(this, isUserInput));
  }

  _isTypeOptionValid = () => (
    ['', 'small', 'large', 'xlarge', 'space', 'header', 36, 52, 60].includes(this._type)
  )

  _getHostElement() {
    return this.el.nativeElement;
  }

  /** Gets whether the button has one of the given attributes. */
  _hasHostAttributes(...attributes: string[]) {
    return attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
  }
}
