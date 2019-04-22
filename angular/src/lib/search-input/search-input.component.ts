/** @component search-input */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  Optional,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

const cb = () => {};

@Component({
  selector: 'md-search-input',
  template: `
    <div class="md-input-group md-search-input" [ngClass]="wrapperClasses">
      <md-label
        *ngIf="label"
        [label]="label"
        className="md-label"
        htmlFor="htmlId"
      ></md-label>

      <div class="md-input__icon-container">
        <input
          class="md-input"
          [ngClass]="inputClasses"
          [attr.id]="htmlId"
          [(ngModel)]="value"
          [placeholder]="placeholder"
          [readonly]="readOnly"
          [attr.disabled]="disabled ? '' : null"
          [type]="type"
          [name]="name"
          (blur)="onBlur($event)"
          (focus)="onFocus($event)"
          (keydown)="onKeyDown($event)"
          (mousedown)="onMouseDown($event)"
        />

        <i
          class="md-icon icon md-search-input__icon"
          [ngClass]="iconClass"
        ></i>

        <button
          *ngIf="clear && value !== ''"
          class="md-button md-button--36 md-button--icon"
          (click)="handleClear()"
          type="button"
          aria-label="clear input"
        >
          <span class="md-button__children" style="opacity: 1;">
            <i
              class="md-icon icon icon-clear-active_16 md-input__icon-clear"
            ></i>
          </span>
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class SearchInputComponent implements ControlValueAccessor {
  /** @option Optional css class string | ''  */
  @Input() public class: string = '';
  /** @option optional button to clear input text */
  @Input() public clear: boolean = false;
  /** @option Sets the disabled attribute of the Input | false */
  @Input() public disabled: boolean = false;
  /** @option Unique HTML ID used for tying label to HTML input for automated testing */
  @Input() public htmlId: string = '';
  /** @option Input css class name string */
  @Input() public inputClass: string = '';
  /** @option Overall input group size | '' */
  @Input() public inputSize: string = '';
  /** @option Input label text | '' */
  @Input() public label: string = '';
  /** @option Placeholder text to display when Input is empty | '' */
  @Input() public placeholder: string = '';
  /** @option Determines if Input can be edited | false */
  @Input() public readOnly: boolean = false;
  /** @option Input color theme | '' */
  @Input() public theme: string;
  /** @option Input type | 'text' */
  @Input() public type: string = 'text';
  /** @option Sets the attribute name to the input element | '' */
  @Input() public name: string = '';

  /** @option function when clicked outside of input */
  @Output() handleBlur: EventEmitter<any> = new EventEmitter();
  /** @option function when input is focused */
  @Output() handleFocus: EventEmitter<any> = new EventEmitter();
  /** @option function when key down on input */
  @Output() handleKeyDown: EventEmitter<any> = new EventEmitter();
  /** @option function when mouse down on input */
  @Output() handleMouseDown: EventEmitter<any> = new EventEmitter();

  private innerValue: any = '';

  private onTouchedCallback: () => void = cb;
  private onChangeCallback: (_: any) => void = cb;

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  onKeyDown(event) {
    this.handleKeyDown.emit();
  }

  onMouseDown(event) {
    if (this.disabled) {
      event.stopPropagation();
      return;
    }
    this.handleMouseDown.emit();
  }

  onBlur(event) {
    this.handleBlur.emit();
    event.stopPropagation();
  }

  onFocus(event) {
    if (this.disabled) {
      event.stopPropagation();
      return;
    }
    this.handleFocus.emit();
  }

  constructor(@Optional() @Self() public control: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  get wrapperClasses() {
    return {
      [this.inputSize + ' columns']: this.inputSize,
      'md-search-input--pill': this.type === 'pill',
      'read-only': this.readOnly,
      disabled: this.disabled,
      [this.class]: this.class,
    };
  }

  get inputClasses() {
    return {
      [this.inputClass]: this.inputClass,
      'read-only': this.readOnly,
      disabled: this.disabled,
      dirty: this.value,
    };
  }

  get iconClass() {
    return {
      'icon-search_16 ': this.type === 'pill',
      'icon-search_20': this.type !== 'pill',
    };
  }

  handleClear() {
    this.value = '';
  }
}
