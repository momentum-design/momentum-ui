/** @component input */

import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  Optional,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';

const cb = () => {};

@Component({
  selector: 'md-input',
  template: `
    <div class="md-input-group" [ngClass]="wrapperClasses">
      <md-label
        *ngIf="label"
        [label]="label"
        className="md-label"
        htmlFor="htmlId"
      ></md-label>

      <ng-container *ngIf="clear; else normal">
        <div class="md-input__icon-container">
          <input
            *ngIf="!secondaryLabel"
            class="md-input"
            [ngClass]="inputClasses"
            [(ngModel)]="value"
            [placeholder]="placeholder"
            [readonly]="readOnly"
            [attr.disabled]="disabled ? '' : null"
            [type]="type"
            (blur)="onBlur($event)"
            (focus)="onFocus($event)"
            (keydown)="onKeyDown($event)"
            (mousedown)="onMouseDown($event)"
            [name]="name"
            [attr.id]="htmlId"
          />

          <button
            *ngIf="clear && value !== ''"
            class="md-button md-button--36 md-button--icon"
            type="button"
            aria-label="clear input"
            (click)="handleClear()"
          >
            <span class="md-button__children" style="opacity: 1;">
              <i
                class="md-icon icon icon-clear-active_16 md-input__icon-clear"
              ></i>
            </span>
          </button>
        </div>
      </ng-container>

      <ng-template #normal>
        <input
          class="md-input"
          [ngClass]="inputClasses"
          [(ngModel)]="value"
          [type]="type"
          [placeholder]="placeholder"
          [readonly]="readOnly"
          [attr.disabled]="disabled ? '' : null"
          (blur)="onBlur($event)"
          (focus)="onFocus($event)"
          (keydown)="onKeyDown($event)"
          (mousedown)="onMouseDown($event)"
          [name]="name"
          [attr.id]="htmlId"
        />
      </ng-template>

      <!-- Secondary Label -->
      <div class="md-label__secondary-label-container" *ngIf="secondaryLabel">
        <input
          class="md-input"
          [ngClass]="inputClasses"
          [(ngModel)]="value"
          [type]="type"
          [placeholder]="placeholder"
          [readonly]="readOnly"
          [attr.disabled]="disabled ? '' : null"
          (blur)="onBlur($event)"
          (focus)="onFocus($event)"
          (keydown)="onKeyDown($event)"
          (mousedown)="onMouseDown($event)"
          [name]="name"
          [attr.id]="htmlId"
        />

        <label class="md-label__secondary-label" [attr.for]="htmlId">
          <span>{{ secondaryLabel }}</span>
        </label>
      </div>

      <!-- Error Input -->
      <ng-container *ngIf="errors">
        <md-input-error *ngFor="let error of errors" [error]="error">
        </md-input-error>
      </ng-container>

      <!-- Angular Control Error Validation Message  -->
      <div class="md-input__messages" role="alert" *ngIf="control.invalid">
        <div class="message">{{ errorValid }}</div>
      </div>

      <!-- Helper Text -->
      <md-input-helper *ngIf="inputHelpText" [message]="inputHelpText">
      </md-input-helper>
    </div>
  `,
})
export class InputComponent implements ControlValueAccessor, OnChanges {
  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  get hasRequiredError() {
    return this.control.hasError('required');
  }

  get errorValid() {
    // if (this.control.pristine) {
    //   return '';
    // }
    for (const error in this.errorObj) {
      if (this.control.errors[error]) {
        return this.errorObj[error];
      }
    }

    if (this.errorObj['custom']) {
      return this.errorObj['custom'];
    }
  }

  constructor(@Optional() @Self() public control: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  get wrapperClasses() {
    return {
      [this.inputSize + ' columns']: this.inputSize,
      'read-only': this.readOnly,
      disabled: this.disabled,
      error:
        Object.keys(this.errorObj).length > 0 &&
        this.control.invalid &&
        this.control.dirty,
      ['md-input-group--' + this.theme]: this.theme,
      [this.errorType]: this.errorType,
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

  private innerValue: any = '';

  private onTouchedCallback: () => void = cb;
  private onChangeCallback: (_: any) => void = cb;

  /** @prop Optional css class string | ''  */
  @Input() public class: string = '';
  /** @prop optional button to clear input text */
  @Input() public clear: boolean = false;
  /** @prop Sets the disabled attribute of the Input | false */
  @Input() public disabled: boolean = false;
  /** @prop Unique HTML ID used for tying label to HTML input for automated testing */
  @Input() public htmlId: string = '';
  /** @prop Array of objects with error type and error message */
  @Input() public errorArr: any[];
  /** @prop Input css class name string */
  @Input() public inputClass: string = '';
  /** @prop Help Text to appear under the input | '' */
  @Input() public inputHelpText: string = '';
  /** @prop Overall input group size | '' */
  @Input() public inputSize: string = '';
  /** @prop Input label text | '' */
  @Input() public label: string = '';
  /** @prop Placeholder text to display when Input is empty | '' */
  @Input() public placeholder: string = '';
  /** @prop Determines if Input can be edited | false */
  @Input() public readOnly: boolean = false;
  /** @prop Secondary Input label | ''  */
  @Input() public secondaryLabel: string = '';
  /** @prop Input color theme | '' */
  @Input() public theme: string;
  /** @prop Input type | 'text' */
  @Input() public type: string = 'text';
  /** @prop Sets the attribute name to the input element | '' */
  @Input() public name: string = '';
  /** @prop Optional error messages object with angular validators | {} */
  @Input() public errorObj: object = {};

  /** @prop function when clicked outside of input */
  @Output() handleBlur: EventEmitter<any> = new EventEmitter();
  /** @prop function when input is focused */
  @Output() handleFocus: EventEmitter<any> = new EventEmitter();
  /** @prop function when key down on input */
  @Output() handleKeyDown: EventEmitter<any> = new EventEmitter();
  /** @prop function when mouse down on input */
  @Output() handleMouseDown: EventEmitter<any> = new EventEmitter();

  public errorType;
  public errors;

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

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  private determineErrorType = array => {
    return array.reduce((agg, e) => {
      return agg === 'error' ? agg : e.type || '';
    }, '');
  }

  private filterErrorsByType = (array, value) => {
    return array.reduce(
      (agg, e) => (e.type === value ? agg.concat(e.error) : agg),
      []
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.errorArr) {
      const changedArr = changes.errorArr.currentValue;

      if (changedArr.length > 0) {
        this.errorType = this.determineErrorType(changedArr);
        this.errors =
          this.errorType && this.filterErrorsByType(changedArr, this.errorType);
      }
    }
  }

  handleClear() {
    this.value = '';
  }
}

