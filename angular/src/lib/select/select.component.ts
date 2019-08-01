import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Handler } from './handler';
import { Subscription } from 'rxjs';
import { SelectService } from './select.service';
import findIndex from 'lodash-es/findIndex';
import { FilterUtils } from '../utils/filterUtils/filters';

const SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};


@Component({
  selector: 'md-select',
  template: `

  <div
    #selectContainer
    [ngClass]="{
      'md-dropdown': true,
      'md-dropdown--open': overlayVisible
    }"
    (click)="openOverlay($event)"
    [ngStyle]="containerStyle"
    [class]="containerClass"
  >

    <div class="md-dropdown__hidden--accessor">
      <input
        #inputRef
        [attr.id]="id"
        type="text"
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
        (keydown)="onKeydown($event)"
        [disabled]="disabled"
        [attr.tabindex]="tabindex"
        [attr.aria-label]="selectedItem ? selectedItem.label : ' '"
        aria-haspopup="listbox"
        readonly
      >
    </div>

    <div class="md-dropdown__hidden--accessor md-dropdown__hidden--select">
      <select
        [attr.required]="required"
        [attr.name]="name"
        tabindex="-1"
        aria-hidden="true"
      >
        <option *ngIf="placeholder" value="">{{placeholder}}</option>

        <option
          *ngIf="selectedItem"
          [value]="selectedItem.value"
          [selected]="true"
        >
          {{selectedItem.label}}
        </option>
      </select>
    </div>

    <label
      *ngIf="label !== null"
      [ngClass]="{
        'md-dropdown__label': true,
        'md-dropdown__label--empty':(label == null || label.length === 0)
      }"
    >

      <ng-container *ngIf="!selectedItemTemplate && !isMulti">
        {{label||'empty'}}
      </ng-container>

      <ng-container *ngIf="isMulti && selection">
        {{selection.length > 0 ? selection.length + ' Items Selected' : placeholder}}
      </ng-container>

      <!-- Custom Template -->

      <ng-container
        *ngTemplateOutlet="selectedItemTemplate; context: {$implicit: selectedItem}">
      </ng-container>

    </label>

    <label
      *ngIf="label === null"
      [ngClass]="[
        (placeholder === null || placeholder.length === 0) ? 'md-dropdown__label--empty' : '',
        className
      ]"
      class="md-dropdown__label"
    >
      {{isMulti && selection.length > 0 ? selection.length + " Items Selected" : placeholder}}
    </label>

    <div class="md-dropdown--trigger">
      <md-icon name="arrow-down_16"></md-icon>
    </div>

    <div
      *ngIf="overlayVisible"
      [@panelTransitionAnimation]="{
        value: 'visible',
        params: {
          showTransitionParams: showTransitionOptions,
          hideTransitionParams: hideTransitionOptions
        }
      }"
      (@panelTransitionAnimation.start)="onOverlayStart($event)"
      class="md-dropdown__panel"
    >

      <!-- filter search -->
      <div
        *ngIf="filter"
        class="md-input-group md-search-input md-search-input--pill"
        (click)="$event.stopPropagation()"
      >
        <div class="md-input__icon-container">

          <input
            #filterSearch
            type="text"
            autocomplete="off"
            [value]="filterValue || ''"
            class="md-input"
            [attr.placeholder]="filterPlaceholder"
            (keydown.enter)="$event.preventDefault()"
            (keydown)="onKeydown($event)"
            (input)="onFilter($event)"
            [attr.aria-label]="ariaFilterLabel"
          >

          <i class="md-icon icon icon-search_16 md-search-input__icon"></i>
        </div>
      </div>

      <div
        class="md-dropdown__items--wrapper"
        [style.max-height]="(scrollHeight||'auto')"
      >
        <ul
          class="md-dropdown__items md-dropdown__list"
          role="listbox"
        >
          <ng-container>
            <ng-container
              *ngTemplateOutlet="itemslist; context: {
                $implicit: selectOptionsToDisplay,
                selectedItem: selectedItem
              }">
            </ng-container>
          </ng-container>

          <ng-template #itemslist let-options let-selectedItem="selectedItem">

            <ng-container>
              <ng-template ngFor let-option let-i="index" [ngForOf]="options">
                <md-selectItem
                  [option]="option"
                  [selected]="selectedItem === option"
                  (handleClick)="onSelectItemClick($event)"
                  [selectItemSize]="selectItemSize"
                  [template]="itemTemplate">
                </md-selectItem>
              </ng-template>
            </ng-container>

          </ng-template>

          <li
            *ngIf="filter && selectOptionsToDisplay && selectOptionsToDisplay.length === 0"
            class="md-dropdown--empty"
          >
            {{noResultsMessage}}
          </li>
        </ul>
      </div>
    </div>
  </div>
  `,
  styles: [],
  providers: [SELECT_VALUE_ACCESSOR, SelectService],
  animations: [
    trigger('panelTransitionAnimation', [
      state('void', style({
        transform: 'translateY(5%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('void => visible', animate('{{showTransitionParams}}')),
      transition('visible => void', animate('{{hideTransitionParams}}'))
    ])
  ],
})
export class SelectComponent implements OnInit, AfterViewChecked, ControlValueAccessor {

  constructor(
    public el: ElementRef,
    public selectService: SelectService,
    public renderer: Renderer2,
    private cd: ChangeDetectorRef,
    public zone: NgZone
  ) { }
  /** @prop Optional select css class string | '' */
  @Input() className: string = '';
  /** @prop set the placeholder text | '' */
  @Input() placeholder: string = '';
  /** @prop set the select as required | false */
  @Input() required: boolean = false;
  /** @prop set the select attribute name| '' */
  @Input() name: string;
  /** @prop show the filter search | false */
  @Input() filter: boolean = false;
  /** @prop set the filter search placeholder | '' */
  @Input() filterPlaceholder: string = '';
  /** @prop set the aria-label on the filter input | '' */
  @Input() ariaFilterLabel: string;
  /** @prop set which key the filter will use | 'label' */
  @Input() filterBy: string = 'label';
  /** @prop set how the string should be filtered | 'contains' */
  @Input() filterMode: string = 'contains';
  /** @prop resets the filter when panel hidden | false */
  @Input() resetFilterOnHide: boolean = false;
  /** @prop set which key to show as the option label | '' */
  @Input() optionLabel: string;
  /** @prop Optional prop to know if user is able to select multiple options | false */
  @Input() public isMulti = false;
  /** @prop dataKey can be used to find selected options from multi-select, otherwise findIndex will run */
  @Input() dataKey: string;
  /** @prop message to show when filter returns null | 'No Results Found' */
  @Input() noResultsMessage: string = 'No Results Found';
  /** @prop set the height in px of each select option */
  @Input() selectItemSize: number;
  /** @prop sets the tab index on the input */
  @Input() tabindex: number;
  /** @prop set the inline style of the entire select div class */
  @Input() containerStyle: Object;
  /** @prop set the css class on the entire select div class | '' */
  @Input() containerClass: string = '';
  /** @prop sets the scroll height of the select options panel | '270px'  */
  @Input() scrollHeight: string = '270px';
  /** @prop manually set the zindex of the overlay | 0  */
  @Input() overlayZIndex: number = 0;
  /** @prop set the z-index adjustment | true */
  @Input() adjustZIndex: boolean = true;
  /** @prop set the select input as read-only | false  */
  @Input() readonly: boolean = false;
  /** @prop set the attribute id of the select input | ''  */
  @Input() id: string = '';
  /** @prop set the transition animation when showing overlay panel | '225ms ease-out' */
  @Input() showTransitionOptions: string = '225ms ease-out';
  /** @prop set the transition animation when showing overlay panel | '195ms ease-in' */
  @Input() hideTransitionOptions: string = '195ms ease-in';

  /** @prop sets the select options from [] */
  @Input() get options(): any[] {
    return this._options;
  }

  set options(item: any[]) {
    const options = this.optionLabel ? this.makeSelectOptions(item, this.optionLabel) : item;
    this._options = options;
    this.selectOptionsToDisplay = this._options;
    this.updateSelectedItem(this.value);
    this.optionsChanged = true;

    if (this.filterValue && this.filterValue.length) {
      this.startFilter();
    }
  }
  /** @prop sets the selection from multi-select */
  @Input() get selection(): any {
    return this._selection;
  }

  set selection(item: any) {
    this._selection = item;

    if (!this.preventPropagation) {
      this.updateSelectionKeys();
      this.selectService.onSelectionChange();
    }
    this.preventPropagation = false;
  }
  /** disable the select */
  @Input() get disabled(): boolean {
    return this._disabled;
  }

  set disabled(_disabled: boolean) {
    if (_disabled) {
      this.focused = false;
    }

    this._disabled = _disabled;
    this.cd.detectChanges();
  }

  // getter for the selectedItem label
  get label(): string {
    return (this.selectedItem ? this.selectedItem.label : null);
  }

  /** @prop emitter to fire the event after click on the select */
  @Output() handleClick: EventEmitter<any> = new EventEmitter();
  /** @prop emitter to fire after showing the overlay select options panel */
  @Output() handleShow: EventEmitter<any> = new EventEmitter();
  /** @prop emitter to fire after hiding the select options panel */
  @Output() handleHide: EventEmitter<any> = new EventEmitter();
  /** @prop emitter to fire the select option value change  */
  @Output() handleChange: EventEmitter<any> = new EventEmitter();
  /** @prop emitter to fire after input focus */
  @Output() handleFocus: EventEmitter<any> = new EventEmitter();
  /** @prop emitter to fire after input blur */
  @Output() handleBlur: EventEmitter<any> = new EventEmitter();
  /**@prop emit function when multi-checked selection changes */
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();
  /**@prop emit function when row is checked */
  @Output() rowCheck: EventEmitter<any> = new EventEmitter();
  /**@prop emit funciton when row is unchecked */
  @Output() rowUncheck: EventEmitter<any> = new EventEmitter();

  @ViewChild('inputRef') inputViewChild: ElementRef;
  @ViewChild('filterSearch') filterViewChild: ElementRef;
  @ViewChild('selectContainer') selectContainerViewChild: ElementRef;

  private _disabled: boolean;
  filterValue: string;
  searchValue: string;
  searchTimeout: any;
  previousSearchChar: string;
  currentSearchChar: string;
  value: any;
  overlay: HTMLDivElement;
  overlayVisible: boolean;
  selectedItem: any;
  inputFilled: boolean; // check to see if input filled
  selectedItemTemplate: TemplateRef<any>;
  itemTemplate: TemplateRef<any>;
  _options: any[];
  selectOptionsToDisplay: any[];
  optionsChanged: boolean;
  selectedItemUpdated: boolean;
  itemsWrapper: HTMLDivElement;
  docResizeListener: any;
  docClickListener: any;
  selfClick: boolean;
  itemClick: boolean;
  focused: boolean;
  _selection: any;
  selectionKeys: any = {}; // for adding and removing to multi-selection
  preventPropagation: boolean;

  onModelChange: Function = () => {};

  onModelTouched: Function = () => {};

  ngOnInit() {
    this.selectOptionsToDisplay = this.options;
    this.updateSelectedItem(null);
  }

  ngAfterViewChecked() {
    if (this.optionsChanged && this.overlayVisible) {
      this.optionsChanged = false;

      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.alignOverlayPanel();
        }, 1);
      });
    }

    if (this.selectedItemUpdated && this.itemsWrapper) {
      const selectedItem = Handler.findItem(this.overlay, 'li.md-dropdown__item--highlight');
      if (selectedItem) {
        Handler.scrollInView(this.itemsWrapper, Handler.findItem(this.overlay, 'li.md-dropdown__item--highlight'));
      }
      this.selectedItemUpdated = false;
    }
  }

  // Control Value Accessor Methods

  writeValue(value: any): void {
    if (this.filter) {
      this.resetFilter();
    }

    this.value = value;
    this.updateSelectedItem(value);

    this.updateFilledState();
    this.cd.markForCheck();
  }
  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  makeSelectOptions(option: any[], label: string) {
    let selectItems;
    if (option && option.length) {
      selectItems = [];
      for (const item of option) {
        selectItems.push({label: item[label], value: item});
      }
    }

    return selectItems;
  }

  updateFilledState() {
    this.inputFilled = (this.selectedItem != null);
  }

  resetFilter(): void {
    if (this.filterViewChild && this.filterViewChild.nativeElement) {
      this.filterValue = null;
      this.filterViewChild.nativeElement.value = '';
    }
    this.selectOptionsToDisplay = this.options;
  }

  openOverlay(event) {
    if (this.disabled || this.readonly) {
      return;
    }

    this.handleClick.emit(event);
    this.selfClick = true;

    if (!this.itemClick ) {
      this.inputViewChild.nativeElement.focus();

      if (this.overlayVisible) {
        this.hide();
      } else {
        this.show();
      }
    }
  }

  onFilter(event): void {
    const inputValue = event.target.value;
    if (inputValue && inputValue.length) {
      this.filterValue = inputValue;
      this.startFilter();
    } else {
      this.filterValue = null;
      this.selectOptionsToDisplay = this.options;
    }

    this.optionsChanged = true;
  }

  startFilter() {
    const filterBy: string[] = this.filterBy.split(',');

    if (this.options && this.options.length) {
      this.selectOptionsToDisplay = FilterUtils.filter(this.options, filterBy, this.filterValue, this.filterMode);
      this.optionsChanged = true;
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (this.readonly || !this.selectOptionsToDisplay || this.selectOptionsToDisplay.length === null) {
      return;
    }

    // tslint:disable-next-line: deprecation
    const key = event.key || event.which || event.keyCode;

    let selectedItemIndex;

    switch (key) {

      case 'ArrowDown':
      case 40:
        if (!this.overlayVisible && event.altKey) {
          this.show();
        } else {

          selectedItemIndex = this.selectedItem ? this.findSelectOptionIndex(this.selectedItem.value, this.selectOptionsToDisplay) : -1;
          const nextEnabledOption = this.findNextEnabledOption(selectedItemIndex);
          if (nextEnabledOption) {
            this.selectItem(event, nextEnabledOption);
            this.selectedItemUpdated = true;
          }
        }
        event.preventDefault();
    break;

    case 'ArrowUp':
    case 38:

        selectedItemIndex = this.selectedItem ? this.findSelectOptionIndex(this.selectedItem.value, this.selectOptionsToDisplay) : -1;
        const prevEnabledOption = this.findPrevEnabledOption(selectedItemIndex);
        if (prevEnabledOption) {
          this.selectItem(event, prevEnabledOption);
          this.selectedItemUpdated = true;
        }
        event.preventDefault();
      break;

      case 'Enter':
      case 13:

        if ( this.selectOptionsToDisplay && this.selectOptionsToDisplay.length > 0) {
          if (this.isMulti) {
            this.toggleRowWithCheckbox(event, this.selectedItem.value);
          } else {
            this.hide();
          }
        }
        event.preventDefault();
      break;

      case 'Escape':
      case 'Tab':
      case 27:
      case 9:
        this.hide();
      break;
    }
  }

  updateSelectedItem(item: any): void {
    this.selectedItem = this.findSelectOption(item, this.selectOptionsToDisplay);
    this.selectedItemUpdated = true;
  }

  findSelectOption(item: any, options: any[]) {
    const index: number = this.findSelectOptionIndex(item, options);
    return (index !== -1) ? options[index] : null;
  }

  findSelectOptionIndex(item: any, options: any[]): number {
    let index: number = -1;
    if (options) {
      for (let i = 0; i < options.length; i++) {
        if ((item === null && options[i].value === null) || item === options[i].value) {
          index = i;
          break;
        }
      }
    }
    return index;
  }

  findPrevEnabledOption(index) {
    let prevEnabledOption;

    if (this.selectOptionsToDisplay && this.selectOptionsToDisplay.length) {
      for (let i = (index - 1); 0 <= i; i--) {
        const option = this.selectOptionsToDisplay[i];
        if (option.disabled) {
            continue;
        } else {
          prevEnabledOption = option;
          break;
        }
      }

      if (!prevEnabledOption) {
        for (let i = this.selectOptionsToDisplay.length - 1; i >= index ; i--) {
          const option = this.selectOptionsToDisplay[i];
          if (option.disabled) {
            continue;
          } else {
            prevEnabledOption = option;
            break;
          }
        }
      }
    }
    return prevEnabledOption;
  }

  findNextEnabledOption(index) {
    let nextEnabledOption;

    if (this.selectOptionsToDisplay && this.selectOptionsToDisplay.length) {
      for (let i = (index + 1); index < (this.selectOptionsToDisplay.length - 1); i++) {
        const option = this.selectOptionsToDisplay[i];

        if (option.disabled) {
          continue;
        } else {
          nextEnabledOption = option;
          break;
        }
      }

      if (!nextEnabledOption) {
        for (let i = 0; i < index; i++) {
          const option = this.selectOptionsToDisplay[i];

          if (option.disabled) {
            continue;
          } else {
            nextEnabledOption = option;
            break;
          }
        }
      }
    }
    return nextEnabledOption;
  }

  onOverlayStart(event: AnimationEvent) {
    switch (event.toState) {
      case 'visible':
        this.overlay = event.element;
        this.itemsWrapper = Handler.findItem(this.overlay, '.md-dropdown__items--wrapper');

        if (this.adjustZIndex) {
          this.overlay.style.zIndex = String(this.overlayZIndex + (++Handler.zindex));
        }
        this.alignOverlayPanel();
        this.bindDocClickListener();
        this.bindDocResizeListener();

        if (this.options && this.options.length) {
          const selectedListItem = Handler.findItem(this.itemsWrapper, '.md-dropdown__item.md-dropdown__item--highlight');
          if (selectedListItem) {
            Handler.scrollInView(this.itemsWrapper, selectedListItem);
          }
        }

        if (this.filterViewChild && this.filterViewChild.nativeElement) {
          this.filterViewChild.nativeElement.focus();
        }
        this.handleShow.emit(event);
      break;

      case 'void':
        this.handleHide.emit(event);
        this.onOverlayHide();
      break;
    }
  }

  alignOverlayPanel() {
    if (this.overlay) {
      Handler.relativePosition(this.overlay, this.selectContainerViewChild.nativeElement);
    }
  }

  bindDocClickListener() {
    if (!this.docClickListener) {
      this.docClickListener = this.renderer.listen('document', 'click', () => {

        if (!this.selfClick && !this.itemClick) {
          this.hide();
          this.unbindDocClickListener();
        }

        this.clearClickState();
        this.cd.markForCheck();
      });
    }
  }

  bindDocResizeListener() {
    this.docResizeListener = this.onWindowResize.bind(this);
    window.addEventListener('resize', this.docResizeListener);
  }

  onWindowResize() {
    this.hide();
  }

  onSelectItemClick(event) {
    const option = event.option;
    this.itemClick = true;

      if (!option.disabled) {
        this.selectItem(event, option);
        this.inputViewChild.nativeElement.focus();
        this.inputFilled = true;
      }

      setTimeout(() => {
        if (!this.isMulti) {
          this.hide();
        }
      }, 150);
  }

    selectItem(event, option) {
      if (this.selectedItem !== option) {
        this.selectedItem = option;
        this.value = option.value;
        this.onModelChange(this.value);

        this.handleChange.emit({
          value: this.value
        });
      }
    }

  hide() {
    this.overlayVisible = false;
    if (this.filter && this.resetFilterOnHide) {
      this.resetFilter();
    }

    this.cd.markForCheck();
  }

  show() {
    this.overlayVisible = true;
  }

  onFocus(event) {
    this.focused = true;
    this.handleFocus.emit(event);
  }

  onBlur(event) {
    this.focused = false;
    this.onModelTouched();
    this.handleBlur.emit(event);
  }

  clearClickState() {
    this.selfClick = false;
    this.itemClick = false;
  }

  onOverlayHide() {
    this.unbindDocClickListener();
    this.unbindDocResizeListener();
    this.overlay = null;
    this.itemsWrapper = null;
  }

  unbindDocClickListener() {
    if (this.docClickListener) {
      this.docClickListener();
      this.docClickListener = null;
    }
  }

  unbindDocResizeListener() {
    if (this.docResizeListener) {
      window.removeEventListener('resize', this.docResizeListener);
      this.docResizeListener = null;
    }
  }

  // checkbox ()'s

  isSelected(rowData) {
    if (rowData && this.selection) {
      if (this.dataKey) {
        for (let i = 0; i < this.selection.length; i++) {
          if (this.selection[i][this.dataKey] === rowData[this.dataKey]) {
            this.selectionKeys[rowData[this.dataKey]] = 1;
          }
        }
        return this.selectionKeys[rowData[this.dataKey]] !== undefined; // found in selection
      } else {
        if (this.selection instanceof Array) {
          return findIndex(this.selection, rowData) > -1;
        } else {
          return this.selection === rowData;
        }
      }
    }
    return false;
  }

  toggleRowWithCheckbox(event, rowData: any) {
    this.selection = this.selection || [];
    const isChecked = this.isSelected(rowData);

    const rowDataKeyValue = this.dataKey ? String(rowData[this.dataKey]) : null;

    this.preventPropagation = true;

    if (isChecked) { // then uncheck from selection
      const checkedIndex = findIndex(this.selection, rowData);
      this._selection = this.selection.filter((item, i) => i !== checkedIndex);
      this.selectionChange.emit(this.selection);

      this.rowUncheck.emit({
        data: rowData,
      });

      if (rowDataKeyValue) {
        delete this.selectionKeys[rowDataKeyValue];
      }

    } else { // add to selection
      this._selection = this.selection ? [...this.selection, rowData] : [rowData];
      this.selectionChange.emit(this.selection);

      this.rowCheck.emit({
        data: rowData,
      });

      if (rowDataKeyValue) {
        this.selectionKeys[rowDataKeyValue] = 1;
      }
    }
    this.selectService.onSelectionChange();
  }

  updateSelectionKeys() {
    if (this.dataKey && this._selection) {

      this.selectionKeys = {};
      if (Array.isArray(this._selection)) {
        for (const data of this._selection) {
          this.selectionKeys[String(data[this.dataKey])] = 1;
        }
      } else {
        this.selectionKeys[String(this._selection[this.dataKey])] = 1;
      }
    }
  }
}


// select item
@Component({
  selector: 'md-selectItem',
  template: `
    <li
      (click)="onSelectOptionClick($event)"
      role="option"
      [attr.aria-label]="option.label"
      [ngStyle]="{'height': selectItemSize + 'px'}"
      [ngClass]="{
        'md-dropdown__item ':true,
        'md-dropdown__item--highlight': selected,
        'md-dropdown__item--empty': !option.label||option.label.length === 0
      }"
    >
      <!-- Multi Check Box Conditional -->
      <ng-container *ngIf="dd.isMulti">
        <md-select-checkbox [data]="option.value"></md-select-checkbox>
      </ng-container>

      <span *ngIf="!template">{{option.label||'empty'}}</span>

      <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
    </li>
  `
})
export class SelectItemComponent {

  @Input() option;

  @Input() selected: boolean;

  @Input() selectItemSize: number;

  @Input() template: TemplateRef<any>;

  @Output() handleClick: EventEmitter<any> = new EventEmitter();

  constructor(public dd: SelectComponent) {}

  onSelectOptionClick(event: Event) {
    this.handleClick.emit({
      option: this.option
    });

    if (this.dd.isMulti) {
      this.dd.toggleRowWithCheckbox(event, this.option.value);
    }
  }
}

// select Checkbox

@Component({
  selector: 'md-select-checkbox',
  template: `
    <div
      class="md-dropdown__checkbox--wrapper"
      [ngClass]="[className]"
      (click)="handleClick($event)"
    >
      <div>
        <input
          type="checkbox"
          class="md-dropdown__checkbox--input"
          [checked]="checked"
          [disabled]="disabled"
          (click)="handleClick($event)"
        >
      </div>
    </div>
  `
})
export class SelectCheckboxComponent implements OnInit, OnDestroy {

  @Input() data: any;
  @Input() disabled: boolean = false;
  @Input() className: string = '';

  @ViewChild('box') boxViewChild: ElementRef;

  checked: boolean;

  subscription: Subscription;

  constructor(public dd: SelectComponent, public selectService: SelectService) {
    this.subscription = this.dd.selectService.selectionSource$.subscribe(() => {
      this.checked = this.dd.isSelected(this.data);
    });
  }

  ngOnInit() {
    this.checked = this.dd.isSelected(this.data);
  }

  handleClick(event: Event) {
    if (!this.disabled) {
      this.dd.toggleRowWithCheckbox({
        originalEvent: event,
      }, this.data);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
