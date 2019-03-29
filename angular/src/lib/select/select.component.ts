import {
  Component, Input, ViewChild, AfterContentChecked, ContentChildren,
  QueryList, ChangeDetectorRef, AfterContentInit, OnInit, NgZone, Output,
  EventEmitter, HostListener, AfterViewInit, Optional, Self, ElementRef, SimpleChanges, OnDestroy
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { uniqueId } from 'lodash';
import { ButtonComponent } from '../button';
import { ListItemComponent, OptionSelectionChange } from '../list-item';

import { takeUntil, switchMap, take, startWith } from 'rxjs/operators';
import { Subject, defer, Observable, merge } from 'rxjs';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ControlValueAccessor, NgControl } from '@angular/forms';

export class SelectChange {
  constructor(
    public source: SelectComponent,
    public value: any) { }
}
@Component({
  selector: 'cui-select',
  template: `
    <button cdkOverlayOrigin
        cui-button
        [attr.name]='id'
        aria-label="select button"
        [id]='id'
        (click)='toggle()'
        [class]="buttonClasses"
        type="button"
        #origin="cdkOverlayOrigin"
        #trigger
        >
          <div class='cui-select__label' id="{{id}}__label">
              {{triggerValue || defaultValue}}
              <cui-icon name="arrow-down_16"></cui-icon>
          </div>
    </button>

    <ng-template
      cdkConnectedOverlay
      cdkConnectedOverlayLockPosition
      cdkConnectedOverlayHasBackdrop
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
      [cdkConnectedOverlayPanelClass]="'cui-event-overlay__children'"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="overlayOpen"
      [cdkConnectedOverlayWidth]="anchorWidth"
      [cdkConnectedOverlayOffsetY]="6"
      (backdropClick)="close()"
      (detach)="close()">
      <cui-list #panel role='listbox'>
        <ng-content></ng-content>
      </cui-list>
    </ng-template>
  `,
  styles: [],
  host: {
    class: 'cui-input-group cui-select'
  }
})
export class SelectComponent implements OnInit, AfterContentChecked, AfterContentInit, AfterViewInit,
  ControlValueAccessor, OnDestroy {

  stateChanges = new Subject<void>();

  /** Whether or not the overlay panel is open. */
  private _overlayOpen = false;

  /** Whether filling out the select is required in the form. */
  private _required: boolean = false;

  /** Focus value */
  private _focused = false;

  /** Emits whenever the component is destroyed */
  private readonly _destroy = new Subject<void>();

  /** Deals with the selection logic */
  private _selectionModel: SelectionModel<ListItemComponent>;

  /** Manages keyboard events for options in the overlay */
  private _keyManager: ActiveDescendantKeyManager<ListItemComponent>;

  private _ngModelValue: any;

  isOpen: boolean;

  // selected: any;

  anchorWidth: null;

  // private id: string = uniqueId('cui-select-');

  /** @prop Optional CSS button class name | '' */
  @Input() public buttonClass = '';

  /** @prop Set the default selected option | '' */
  @Input() public defaultValue: string = null;

  /** @prop Set ID for Select Component | null */
  @Input() public id = uniqueId('cui-select-');

  /** @prop Optional prop to know if user is able to select multiple options | false */
  @Input() public isMulti = false;

  /** @prop Optional prop to disable select | false */
  @Input() public disabled = false;

  /** Value of the select control. */
  @Input()
  get ngModel(): any { return this._ngModelValue; }
  set ngModel(newValue: any) {
    if (newValue !== this._ngModelValue) {
      this.writeValue(newValue);
      this._ngModelValue = newValue;
    }
  }

  @Input()
  get compareWith() { return this._compareWith; }
  set compareWith(fn: (o1: any, o2: any) => boolean) {
    if (typeof fn !== 'function') {
      throw Error('`compareWith` must be a function.');

    }
    this._compareWith = fn;
    if (this._selectionModel) {
      // A different comparator means the selection could change.
      this._initializeSelection();
    }
  }

  /** @option Callback function invoked by user selecting an interactive option within list | null */
  @Output() select = new EventEmitter();

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<SelectChange> =
      new EventEmitter<SelectChange>();

  /** Emits event whenever the raw ngModel value of select changes. */
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

  /** The IDs of child options to be passed to the aria-owns attribute. */
  private _optionIds: string = '';

  /** `View -> model callback called when value changes` */
  private _onChange: (value: any) => void = () => { };

  /** `View -> model callback called when select has been touched` */
  private _onTouched = () => { };

  /** Comparison function to specify which option is displayed. Defaults to object equality. */
  private _compareWith = (obj1: any, obj2: any) => obj1 === obj2;

  get focused(): boolean {
    return this._focused || this._overlayOpen;
  }
  set focused(value: boolean) {
    this._focused = value;
  }

  /** Whether or not the overlay panel is open. */
  get overlayOpen(): boolean {
    return this._overlayOpen;
  }

  /** The currently selected option. */
  get selected(): ListItemComponent | ListItemComponent[] {
    return this.isMulti ? this._selectionModel.selected : this._selectionModel.selected[0];
  }

  get triggerValue(): string {
    if (!this._selectionModel || this._selectionModel.isEmpty()) {
      return '';
    }

    if (this.isMulti) {
      const selectedOptions = this._selectionModel.selected.map(option => option.viewValue);

      // if (this._isRt1()) { // right to left mode
      // selectedOptions.reverse();
      // }

      // return selectedOptions.join(',');
      return `${selectedOptions.length} Item Selected`;
    }
    return this._selectionModel.selected[0].viewValue;
  }

  @HostListener('keydown', ['$event']) handleKeydown = event => {
    console.log('[select]: keydown event');
    console.log(event);
    if ((event.keyCode === 13 || event.keyCode === 32) && this._keyManager.activeItem) {
      event.preventDefault();
      this._keyManager.activeItem.selectViaInteraction();
    }
    this._keyManager.onKeydown(event);
  }

  constructor(
    private _el: ElementRef,
    private _cd: ChangeDetectorRef,
    private _ngZone: NgZone,
    @Self() @Optional() public ngControl: NgControl) {

      // super(ngControl);

      this.optionSelectionChanges.subscribe(event => {
        this._onSelect(event.source, event.isUserInput);
      });
  }

  ngOnInit() {
    this._selectionModel = new SelectionModel<ListItemComponent>(this.isMulti);
    this.stateChanges.next();
  }

  ngAfterViewInit() {
    this._keyManager = new ActiveDescendantKeyManager<ListItemComponent>(this.selectOptions).withWrap();
  }

  ngAfterContentInit() {
    this._initKeyManager();

    this._selectionModel.onChange.pipe(takeUntil(this._destroy)).subscribe(event => {
      event.added.forEach(option => option.select());
      event.removed.forEach(option => option.deselect());
    });

    this.selectOptions.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      this._resetOptions();
      this._initializeSelection();
    });

    // set up children with props
    this.selectOptions.forEach((option) => {
      option.isMulti = this.isMulti;
    });

    this._cd.detectChanges();
  }

  ngOnChnages(changes: SimpleChanges) {
    if (changes['disabled']) {
      this.stateChanges.next();
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    this.stateChanges.complete();
  }

  ngAfterContentChecked() {
    this._setAnchorWidth(this.originButton.el.nativeElement);
  }

  toggle(): void {
    this.overlayOpen ? this.close() : this.open();
  }

  close(): void {
    if (this._overlayOpen) {
      this._overlayOpen = false;
      this._cd.markForCheck();
      this._onTouched();
    }
  }

  open(): void {
    if (this.disabled || !this.selectOptions || !this.selectOptions.length || this._overlayOpen) {
      return;
    }

    this._overlayOpen = true;
    this._cd.markForCheck();
  }

  public get buttonClasses(): string {
    return 'cui-button--input' +
      `${(this.buttonClass && ` ${this.buttonClass}`) || ''}`;
  }

  // currentValue = () => {
  //   const { selected } = this;
  //   if (!this.isMulti && selected.length) {
  //     return selected[0].label;
  //   }
  //   if (selected.length === 1) {
  //     return `${selected.length} Item Selected`;
  //   } else if (selected.length) {
  //     return `${selected.length} Items Selected`;
  //   }
  // }

  // ControlValueAccessor Interface Mehtods
  writeValue(value: any): void {
    if (this.selectOptions) {
      this._setSelectionByNgModel(value);
    }
  }

  /**
   * saves callback function to be called when select's ngModel changes from user input
   */
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
    this.disabled = isDisabled;
    this._cd.markForCheck();
    this.stateChanges.next();
  }

  _initializeSelection(): void {
    Promise.resolve().then(() => {
      this._setSelectionByNgModel(this.ngControl ? this.ngControl.value : this._ngModelValue);
      this.stateChanges.next();
    });
  }

  _setSelectionByNgModel(value: any | any[]): void {
    if (this.isMulti && value) {
      if (!Array.isArray(value)) {
        throw Error('Value must be an array in multiple-selection mode.');
      }

      this._selectionModel.clear();
      const correspondingOption = this._selectValue(value);

      // Shift focus to the active item.
      if (correspondingOption) {
        this._keyManager.setActiveItem(correspondingOption);
      }
    }
  }

  _selectValue(value: any): ListItemComponent | undefined {
    const correspondingOption = this.selectOptions.find((option: ListItemComponent) => {
      try {
        return option.label != null && this._compareWith(option.label, value);
      } catch (error) {
        console.warn(error);
        return false;
      }
    });

    if (correspondingOption) {
      this._selectionModel.select(correspondingOption);
    }

    return correspondingOption;
  }

  /** Sets up a key manager to listen to keyboard events on the overlay panel. */
  private _initKeyManager() {
    this._keyManager = new ActiveDescendantKeyManager<ListItemComponent>(this.selectOptions)
      .withTypeAhead()
      .withVerticalOrientation()
      // .withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr')
      .withAllowedModifierKeys(['shiftKey']);

    this._keyManager.tabOut.pipe(takeUntil(this._destroy)).subscribe(() => {
      // Restore focus to the trigger before closing. Ensures that the focus
      // position won't be lost if the user got focus into the overlay.
      this.focus();
      this.close();
    });

    this._keyManager.change.pipe(takeUntil(this._destroy)).subscribe(() => {
      if (this._overlayOpen && this.panel) {
        // this._scrollActiveOptionIntoView();
      } else if (!this._overlayOpen && !this.isMulti && this._keyManager.activeItem) {
        this._keyManager.activeItem.selectViaInteraction();
      }
    });
  }

  /** Drops current option subscriptions and IDs and resets from scratch. */
  private _resetOptions(): void {
    const changedOrDestroyed = merge(this.selectOptions.changes, this._destroy);

    this.optionSelectionChanges.pipe(takeUntil(changedOrDestroyed)).subscribe(event => {
      this._onSelect(event.source, event.isUserInput);

      if (event.isUserInput && !this.isMulti && this._overlayOpen) {
        this.close();
        this.focus();
      }
    });

    // Listen to changes in the internal state of the options and react accordingly.
    // Handles cases like the labels of the selected options changing.
    merge(...this.selectOptions.map(option => option._stateChanges))
      .pipe(takeUntil(changedOrDestroyed))
      .subscribe(() => {
        this._cd.markForCheck();
        this.stateChanges.next();
      });

    this._setOptionIds();
  }

  /** Emits change event to set the model value. */
  private _propagateChanges(fallbackValue?: any): void {
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
    this._cd.markForCheck();
  }

  private _setOptionIds() {
    this._optionIds = this.selectOptions.map(option => option.id).join('');
  }

  /** Invoked when an option is clicked. */
  private _onSelect(option: ListItemComponent, isUserInput?: boolean): void {
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
        // this._sortValues();

        if (isUserInput) {
          // if user selects optionw ith their mouse, restore focus back to trigger
          this.focus();
        }
      }
    }

    if (wasSelected !== this._selectionModel.isSelected(option)) {
      this._propagateChanges();
    }
    this.stateChanges.next();
  }

  focus(): void {
    this._el.nativeElement.focus();
  }

  private _setAnchorWidth = elementAnchor => {
    const anchor = elementAnchor && elementAnchor.getBoundingClientRect();
    this.anchorWidth = anchor.width;
  }
}
