import {
  Component,
  Input,
  ViewChild,
  AfterContentChecked,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnInit,
  NgZone,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  HostBinding
} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';

import { uniqueId } from 'lodash';
import { ButtonComponent } from '../button';
import { ListItemComponent, OptionSelectionChange } from '../list-item';

import { takeUntil, switchMap, take, startWith } from 'rxjs/operators';
import { Subject, defer, Observable, merge } from 'rxjs';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  A,
  DOWN_ARROW,
  END,
  ENTER,
  HOME,
  SPACE,
  UP_ARROW,
  hasModifierKey,
} from '@angular/cdk/keycodes';
import { ControlValueAccessor } from '@angular/forms';

/** Change event object that is emitted when the select value has changed. */
export class SelectChange {
  constructor(
    public source: SelectComponent,
    public value: any
  ) { }
}

@Component({
  selector: 'cui-select',
  template: `
    <button cui-button
        cdkOverlayOrigin
        #trigger="cdkOverlayOrigin"
        [attr.name]='id'
        aria-label="select button"
        [id]='id'
        (click)='toggle()'
        [class]="buttonClasses"
        type="button"
        >
          <div class='cui-select__label' id="{{id}}__label">
              {{currentValue() || defaultValue}}
              <cui-icon name="arrow-down_16"></cui-icon>
          </div>
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="overlayOpen"
      [cdkConnectedOverlayWidth]="this.anchorWidth"
      [cdkConnectedOverlayOffsetY]="6"
      [cdkConnectedOverlayPanelClass]="'cui-event-overlay__children'"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
      (backdropClick)="close()"
      (detach)="close()">
      <cui-list
        #panel
        role='listbox'>
        <ng-content></ng-content>
      </cui-list>
    </ng-template>
  `,
  styles: [],
  host: {
    class: 'cui-input-group cui-select',
    '[class.disabled]': 'disabled'
  }
})
export class SelectComponent implements OnInit, AfterContentChecked, AfterContentInit, ControlValueAccessor {

  private _selectionModel: SelectionModel<ListItemComponent>;
  private readonly _destroy = new Subject<void>();

  /** Manages keyboard events for options in the panel. */
  _keyManager: ActiveDescendantKeyManager<ListItemComponent>;
  public overlayOpen = false;
  public anchorWidth = null;

  /** @prop Optional CSS button class name | '' */
  @Input() public buttonClass = '';
  /** @prop Set the default selected option | '' */
  @Input() public defaultValue: string = null;
  /** @prop Disable the Select Component | false */
  @HostBinding('attr.disabled') @Input() public disabled: boolean = false;
    /** @prop Set ID for Select Component | null */
  @Input() public id = uniqueId('cui-select-');
  /** @prop Optional prop to know if user is able to select multiple options | false */
  @Input() public isMulti = false;
  /** @option Callback function invoked by user selecting an interactive option within list | null */

  /** ngModel of Select Control */
  @Input()
  get ngModel(): any { return this._ngModelValue; }
  set ngModel(newValue: any) {
    if (newValue !== this._ngModelValue) {
      this.writeValue(newValue);
      this._ngModelValue = newValue;
    }
  }
  private _ngModelValue: any;

  @Output() select = new EventEmitter();

   /** Event emitted when the selected value has been changed by the user. */
   @Output() readonly selectionChange: EventEmitter<SelectChange> =
   new EventEmitter<SelectChange>();

  /** facilitates the two-way binding for the `ngModel` input. */
  @Output() readonly ngModelChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(ButtonComponent) originButton;

  /** Panel containing the select options. */
  @ViewChild('panel') panel: ElementRef;

  @ContentChildren(ListItemComponent) selectOptions: QueryList<ListItemComponent>;

  /** Combined stream of all of the child options' change events. */
  readonly optionSelectionChanges: Observable<OptionSelectionChange> = defer(() => {
    if (this.selectOptions) {
      return merge(...this.selectOptions.map(option => option.selectionChange));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.optionSelectionChanges));
  }) as Observable<OptionSelectionChange>;

  /** `View -> model callback called when value changes` */
  private _onChange: (value: any) => void = () => {};
  /** `View -> model callback called when select has been touched` */
  private _onTouched = () => {};
  /** Comparison function to specify which option is displayed. Defaults to object equality. */
  private _compareWith = (o1: any, o2: any) => o1 === o2;

  /** Handles keyboard events when the selected is open. */
  @HostListener('keydown', ['$event'])  _handleOpenKeydown = (event): void => {
    if (event.defaultPrevented || !this.overlayOpen) { return; }

    const keyCode = event.keyCode;
    const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
    const manager = this._keyManager;

    if (keyCode === HOME || keyCode === END) {
      event.preventDefault();
      keyCode === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
    } else if (isArrowKey && event.altKey) {
      // Close the select on ALT + arrow key to match the native <select>
      event.preventDefault();
      this.close();
    } else if ((keyCode === ENTER || keyCode === SPACE) && manager.activeItem &&
      !hasModifierKey(event)) {
      if (!this.isMulti) { this.close(); }
      event.preventDefault();
      manager.activeItem._selectViaInteraction();
    } else if (this.isMulti && keyCode === A && event.ctrlKey) {
      event.preventDefault();
      const hasDeselectedOptions = this.selectOptions.some(opt => !opt.disabled && !opt.selected);

      this.selectOptions.forEach(option => {
        if (!option.disabled) {
          hasDeselectedOptions ? option.select() : option.deselect();
        }
      });
    } else {
      const previouslyFocusedIndex = manager.activeItemIndex;

      manager.onKeydown(event);

      if (this.isMulti && isArrowKey && event.shiftKey && manager.activeItem &&
          manager.activeItemIndex !== previouslyFocusedIndex) {
        manager.activeItem._selectViaInteraction();
      }
    }
  }

  constructor(private _ngZone: NgZone) {
    this.optionSelectionChanges.subscribe(event => {
      this._onSelect(event.source, event.isUserInput);
    });
  }

  ngOnInit () {
    this._selectionModel = new SelectionModel<ListItemComponent>(this.isMulti);
  }

  ngAfterContentInit () {
    this._initKeyManager();

    this._selectionModel.changed.pipe(takeUntil(this._destroy)).subscribe(event => {
      event.added.forEach(option => option.select());
      event.removed.forEach(option => option.deselect());
    });

    this.selectOptions.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._resetOptions();
    });

    // set up children with props
    this.selectOptions.forEach((option) => {
      option.isMulti = this.isMulti;
      this._resetOptions();
    });
  }

  ngAfterContentChecked () {
    this._setAnchorWidth(this.originButton.el.nativeElement);
  }

  get buttonClasses (): string {
    return 'cui-button--input' +
    `${(this.buttonClass && ` ${this.buttonClass}`) || ''}` +
    `${(this.disabled && ` disabled`) || ''}`;
  }

  /** The currently selected option. */
  get selected(): ListItemComponent | ListItemComponent[] {
    return this.isMulti ? this._selectionModel.selected : this._selectionModel.selected[0];
  }

  /** Toggles the overlay panel open or closed. */
  toggle = (): void => {
    this.overlayOpen ? this.close() : this.open();
    this.focus();
  }

  open = (): void => {
    if (this.disabled || !this.selectOptions || !this.selectOptions.length || this.overlayOpen) {
      return;
    }
    this.overlayOpen = true;
  }

  close = (): void => {
    if (this.overlayOpen) {
      this.overlayOpen = false;
    }
  }

  /** Focuses the origin button of the select component. */
  focus = (): void => {
    this.originButton.el.nativeElement.focus();
  }

  currentValue = () => {
    if (!this._selectionModel) { return; }

    const selected = this._selectionModel.selected;
    if (!this.isMulti && selected.length) {
      return selected[0].label; }
    if (selected.length === 1) {
      return `${selected.length} Item Selected`;
    } else if (selected.length) {
      return `${selected.length} Items Selected`;
    }
  }

  /**
   * Sets the select's ngModelValue. Part of the ControlValueAccessor interface
   */
  writeValue = (value: any): void => {
    if (this.selectOptions) {
      this._setSelectionByValue(value);
    }
  }

  registerOnChange = (fn: (value: any) => void): void => {
    this._onChange = fn;
  }

  registerOnTouched = (fn: () => {}): void => {
    this._onTouched = fn;
  }

  setDisabledState ? = (isDisabled: boolean): void => {
    this.disabled = isDisabled;
  }

  /** Sets the selected option based on a value. */
  private _setSelectionByValue = (value: any | any[]): void => {
    if (this.isMulti && value) {
      if (!Array.isArray(value)) { throw Error('Value must be an array in multi-selection mode.'); }

      this._selectionModel.clear();
      value.forEach((currentValue: any) => this._selectValue(currentValue));
    } else {
      this._selectionModel.clear();
      const matchedOption = this._selectValue(value);

      if (matchedOption) {
        this._keyManager.setActiveItem(matchedOption);
      }
    }
  }

  private _selectValue = (value: any): ListItemComponent | undefined => {
    const matchedOption = this.selectOptions.find((option: ListItemComponent) => {
      try {
        return option.label != null && this._compareWith(option.label, value);
      } catch (error) {
        console.warn(error);
      }
      return false;
    });

    if (matchedOption) {
      this._selectionModel.select(matchedOption);
    }

    return matchedOption;
  }

  private _propagateChanges = (fallbackValue?: any): void => {
    let valueToEmit: any = null;

    if (this.isMulti) {
      valueToEmit = (this.selected as ListItemComponent[]).map(option => option.label);
    } else {
      valueToEmit = this.selected ? (this.selected as ListItemComponent).label : fallbackValue;
    }

    this._ngModelValue = valueToEmit;
    this.ngModelChange.emit(valueToEmit);
    this._onChange(valueToEmit);
    this.selectionChange.emit(new SelectChange(this, valueToEmit));
  }

  /** Sets up a key manager to listen to keyboard events on the overlay panel. */
  private _initKeyManager = (): void => {
    this._keyManager = new ActiveDescendantKeyManager<ListItemComponent>(this.selectOptions)
      .withWrap()
      .withTypeAhead();

    this._keyManager.tabOut.pipe(takeUntil(this._destroy)).subscribe(() => {
      // Restore focus to the trigger before closing
      this.focus();
      this.close();
    });

    this._keyManager.change.pipe(takeUntil(this._destroy)).subscribe(() => {
      if (!this.overlayOpen && !this.isMulti && this._keyManager.activeItem) {
        this._keyManager.activeItem._selectViaInteraction();
      }
    });
  }

  /** Drops current option subscriptions and IDs and resets from scratch. */
  private _resetOptions = (): void => {
    const changedOrDestroyed = merge(this.selectOptions.changes, this._destroy);

    this.optionSelectionChanges.pipe(takeUntil(changedOrDestroyed)).subscribe(event => {
      this._onSelect(event.source, event.isUserInput);

      if (event.isUserInput && !this.isMulti && this.overlayOpen) {
        this.close();
        this.focus();
      }
    });
  }

  /** Invoked when an option is clicked. */
  private _onSelect = (option: ListItemComponent, isUserInput: boolean): void => {
    const wasSelected = this._selectionModel.isSelected(option);
    if (option.label == null && !this.isMulti) {
      option.deselect();
      this._selectionModel.clear();
      this._propagateChanges(option.label);
    } else {
      option.selected ? this._selectionModel.select(option) : this._selectionModel.deselect(option);

      if (isUserInput) {
        this._keyManager.setActiveItem(option);
      }

      if (this.isMulti) {

        if (isUserInput) {
          // if clicked with mouse, focus on origin button
          this.focus();
        }
      }
    }
    if (wasSelected !== this._selectionModel.isSelected(option)) {
      this._propagateChanges();
    }
  }

  private _setAnchorWidth = (elementAnchor) => {
    const anchor = elementAnchor && elementAnchor.getBoundingClientRect();
    this.anchorWidth = anchor.width;
  }
}
