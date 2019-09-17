/** @component combo-box */

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnInit,
  OnDestroy,
  Output,
  Provider,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CdkConnectedOverlay, ViewportRuler, OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import find from 'lodash-es/find';
import findIndex from 'lodash-es/findIndex';
import isObject from 'lodash-es/isObject';

// tslint:disable:no-use-before-declare
const CUI_COMBOBOX_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ComboBoxComponent),
  multi: true,
};
// tslint:enable:no-use-before-declare

export interface ComboBoxOffset {
  horizontal: number;
  vertical: number;
}

@Component({
  selector: 'md-combo-box',
  template: `
    <div
      cdk-overlay-origin
      #origin="cdkOverlayOrigin"
      #trigger
    >
      <md-input-group
        [clear]="clear"
      >
        <input
          mdInput
          aria-autocomplete="list"
          [disabled]="disabled"
          (input)="handleInput()"
          (click)="handleInput()"
          (mousedown)="handleInputMousedown($event)"
          (keydown)="handleKeydown($event)"
          [(ngModel)]="inputValue"
          [placeholder]="placeholder"
        >
        <md-input-section
          *ngIf="hasSearchIcon"
        >
          <md-icon name="search_20"></md-icon>
        </md-input-section>
      </md-input-group>
    </div>

    <ng-template
      cdk-connected-overlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="dropdownOpen"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayOffsetY]="offsetY"
      [cdkConnectedOverlayWidth]="dropdownWidth"
      (attach)="attached()"
      (detach)="close()"
      >
      <div #dropdown class="md-event-overlay__children">
        <div
          class="md-combo-box__options"
          [id]="id"
          [ngStyle]="{width: dropdownWidth + 'px'}"
          role="listbox"
          >
          <ng-container *ngFor="let option of filteredOptions; index as i">
            <div
              *ngIf="isObject(option) && !option['isHeader'] || !isObject(option)"
              md-list-item
              [active]="i === activeIndex"
              (click)="selectOption(option)"
              (mousedown)="handleOptionMousedown($event)"
              [disabled]="isObject(option) && option['disabled'] || null"
              [isReadOnly]="isObject(option) && option['isReadOnly'] || null"
              [label]="isObject(option) ? option[searchProp] : option"
              role="option"
              tabindex="-1"
            ></div>
            <md-list-item-header
              *ngIf="isObject(option) && option['isHeader']"
              [header]="option[searchProp]"
            ></md-list-item-header>
          </ng-container>
        </div>
      </div>
    </ng-template>
  `,
  host: {
    '[attr.aria-expanded]': 'dropdownOpen',
    'aria-haspopup': 'listbox',
    'class': 'md-combo-box',
    'role': 'combobox',
  },
  providers: [CUI_COMBOBOX_VALUE_ACCESSOR],
})
export class ComboBoxComponent implements OnInit, OnDestroy, ControlValueAccessor {
  /** @prop Sets the initial input element as empty | false */
  @Input() clear: boolean = false;
  /** @prop Sets the attribute disabled to the ComboBox | false */
  @Input() disabled: boolean = false;
  /** @prop Sets the ComboBox to have a search icon | true */
  @Input() hasSearchIcon: boolean = true;
  /** @prop Sets the ID of the ComboBox */
  @Input() id: string;
  /** @prop Array of options for the ComboBox dropdown | [] */
  @Input() options: Array<Object | string> = [];
  /** @prop Text that initially populates the input field for guidence | ''  */
  @Input() placeholder: string = '';
  /** @prop Sets the search prop | 'label' */
  @Input() searchProp: string = 'label';
  /** @prop Sets the target offset | { horizontal: 0, vertical: 4 } */
  @Input() targetOffset: ComboBoxOffset = { horizontal: 0, vertical: 4 };
  /** @prop Sets the color theme of the ComboBox | '' */
  @Input() theme: string = '';
  @Input()
  get value(): Object | string {
    return this._value;
  }
  set value(value) {
    if (this._value !== value) {
      this._value = value;
      this._change(value);
      this._changeDetectorRef.markForCheck();
      this.inputValue = isObject(value) ? value[this.searchProp] : value;
    }
  }

  @Output() readonly select: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(CdkConnectedOverlay) overlayDir: CdkConnectedOverlay;
  @ViewChild('dropdown') dropdown: ElementRef;
  @ViewChild('trigger') trigger: ElementRef;

  private readonly _destroy = new Subject<void>();
  private _document: Document;
  private _inputValue: string = '';
  private _mutationObserver: MutationObserver;
  private _value: Object | string = '';
  private _shouldUpdatePosition: boolean;

  activeIndex: number = -1;
  allowMutationObserver: boolean = true;
  dropdownOpen: boolean;
  dropdownWidth: number;
  filteredOptions: Array<Object | string> = [];
  isObject: Function;
  offsetY: number = 0;
  positions = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    }
  ];

  get inputValue(): string {
    return this._inputValue;
  }
  set inputValue(value) {
    if (this._inputValue !== value) {
      this._inputValue = value;
      const option = find(this.options, {value});
      if (option) {
        this.value = option;
      } else {
        this.value = value;
      }
    }
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _viewportRuler: ViewportRuler,
    private _overlayContainer: OverlayContainer,
    @Inject(DOCUMENT) _document: any) {
      this._document = _document;
  }

  ngOnInit() {
    this.isObject = isObject;
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  writeValue(value: any): void {
    if (value !== null) {
      this.value = value;
    }
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: any): void {
    this._change = fn;
  }

  registerOnTouched(_: any): void {}

  private _change(_: any) {}

  selectOption(option: Object | string): void {
    this.activeIndex = isObject(option)
      ? findIndex(this.filteredOptions, option[this.searchProp])
      : findIndex(this.filteredOptions, option);
    this.select.emit(option);
    this.value = option;
    this.close();
  }

  handleOptionMousedown(event: MouseEvent): void {
    event.stopPropagation();
  }

  handleInput(): void {
    this._shouldUpdatePosition = true;
    this.filteredOptions = isObject(this.value)
      ? this.applyFilter(this.value[this.searchProp])
      : this.applyFilter(this.value);
    if (this.filteredOptions.length === 1 && this.filteredOptions[0]['isHeader']) {
      this.filteredOptions = [];
    }
    this.filteredOptions.length ? this.open() : this.close();
  }

  handleInputMousedown(event: MouseEvent): void {
    event.stopPropagation();
  }

  applyFilter(value: string) {
    const isSubString = (string: string) => value && string.toLowerCase().includes(value.toLowerCase());
    return this.options.filter(option => {
      if (isObject(option)) {
        return isSubString(option[this.searchProp]) || option['isHeader'];
      } else {
        return isSubString(option);
      }
    });
  }

  open(): void {
    if (this.disabled || !this.options || !this.options.length || this.dropdownOpen) {
      return;
    }
    this.dropdownOpen = true;
    this._changeDetectorRef.markForCheck();
    this._document.addEventListener('mousedown', this._onMousedown);
  }

  attached(): void {
    this.overlayDir.positionChange.pipe(takeUntil(this._destroy)).subscribe(() => {
      this._calculateOverlayPosition();
    });

    if (this.allowMutationObserver) {
      const overlayContainerElement = this._overlayContainer.getContainerElement();
      this._mutationObserver = new MutationObserver(_ => {
        if (this._shouldUpdatePosition) {
          this._shouldUpdatePosition = false;
          this._calculateOverlayPosition();
          this.overlayDir.overlayRef.updatePosition();
        }

        if (this.dropdown) {
          const listItems = overlayContainerElement.querySelector('.md-combo-box__options');
          const observer = new MutationObserver(mutations => {
            this._calculateOverlayPosition();
            this.overlayDir.overlayRef.updatePosition();
            observer.disconnect();
          });
          observer.observe(listItems, {
            attributes: true,
            childList: true,
          });
        }
      });
      this._mutationObserver.observe(overlayContainerElement, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
  }

  private _calculateOverlayPosition(): void {
    this._changeDetectorRef.detectChanges();
    const triggerRect: ClientRect = this.trigger.nativeElement.getBoundingClientRect();
    const dropdownRect: ClientRect = this.dropdown.nativeElement.getBoundingClientRect();
    const viewportSize = this._viewportRuler.getViewportSize();
    this.dropdownWidth = triggerRect.width;
    const panelHeight = dropdownRect.height;

    const topSpaceAvailable = triggerRect.top;
    const bottomSpaceAvailable = viewportSize.height - triggerRect.bottom;

    if (panelHeight > bottomSpaceAvailable && panelHeight < topSpaceAvailable) {
      this.offsetY = -(panelHeight + triggerRect.height + this.targetOffset.vertical);
    } else if (panelHeight > bottomSpaceAvailable && panelHeight > topSpaceAvailable) {
      this.offsetY = -(topSpaceAvailable + triggerRect.height);
    } else {
      this.offsetY = 0;
    }
  }

  close(): void {
    if (this.dropdownOpen) {
      this.dropdownOpen = false;
      this._changeDetectorRef.markForCheck();
      this._document.removeEventListener('mousedown', this._onMousedown);
      if (this._mutationObserver) {
        this._mutationObserver.disconnect();
        this._mutationObserver = null;
      }
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    const length = this.filteredOptions && this.filteredOptions.length - 1;
    const getNewIndex = (currentIndex: number, change: number) => {
      const getPossibleIndex = () => {
        if (currentIndex + change < 0) {
          return length;
        } else if (currentIndex + change > length) {
          return 0;
        }
        return currentIndex + change;
      };

      const possibleIndex = getPossibleIndex();
      const potentialTarget = this.filteredOptions[possibleIndex];

      return (isObject(potentialTarget) && (
          potentialTarget['disabled'] ||
          potentialTarget['isReadOnly'] ||
          potentialTarget['isHeader']))
        ? getNewIndex(possibleIndex, change)
        : possibleIndex;
    };

    if (!this.disabled && this.dropdownOpen) {
      let flag = false;
      if (event.code === 'ArrowDown') {
        this.activeIndex = getNewIndex(this.activeIndex, 1);
        flag = true;
      } else if (event.code === 'ArrowUp') {
        this.activeIndex = getNewIndex(this.activeIndex, -1);
        flag = true;
      } else if (event.code === 'Enter' ) {
        if (this.filteredOptions[this.activeIndex]) {
          this.selectOption(this.filteredOptions[this.activeIndex]);
        }
        flag = true;
      }
      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  }

  private _onMousedown = (_: MouseEvent) => {
    this.close();
  }

}
