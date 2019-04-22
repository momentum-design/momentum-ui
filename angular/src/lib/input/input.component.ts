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
    return '';
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

  /** @option Optional css class string | ''  */
  @Input() public class: string = '';
  /** @option optional button to clear input text */
  @Input() public clear: boolean = false;
  /** @option Sets the disabled attribute of the Input | false */
  @Input() public disabled: boolean = false;
  /** @option Unique HTML ID used for tying label to HTML input for automated testing */
  @Input() public htmlId: string = '';
  /** @option Array of objects with error type and error message */
  @Input() public errorArr: any[];
  /** @option Input css class name string */
  @Input() public inputClass: string = '';
  /** @option Help Text to appear under the input | '' */
  @Input() public inputHelpText: string = '';
  /** @option Overall input group size | '' */
  @Input() public inputSize: string = '';
  /** @option Input label text | '' */
  @Input() public label: string = '';
  /** @option Placeholder text to display when Input is empty | '' */
  @Input() public placeholder: string = '';
  /** @option Determines if Input can be edited | false */
  @Input() public readOnly: boolean = false;
  /** @option Secondary Input label | ''  */
  @Input() public secondaryLabel: string = '';
  /** @option Input color theme | '' */
  @Input() public theme: string;
  /** @option Input type | 'text' */
  @Input() public type: string = 'text';
  /** @option Sets the attribute name to the input element | '' */
  @Input() public name: string = '';
  /** @option Optional error messages object with angular validators | {} */
  @Input() public errorObj: object = {};

  /** @option function when clicked outside of input */
  @Output() handleBlur: EventEmitter<any> = new EventEmitter();
  /** @option function when input is focused */
  @Output() handleFocus: EventEmitter<any> = new EventEmitter();
  /** @option function when key down on input */
  @Output() handleKeyDown: EventEmitter<any> = new EventEmitter();
  /** @option function when mouse down on input */
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

/**
* @component input
* @section default
* @angular
*

<div>
  <md-input
    [(ngModel)]="dataModel"
    inputSize="small-5"
    label="Default Input"
  >
  </md-input>
</div>
*/

/**
* @component input
* @section error
* @angular
*
<div>
  <md-input
    inputSize="small-5"
    label="Error (Error) Input"
    [errorArr]="[{error: 'This is where the error message would be.', type: 'error'}]"
  >
  </md-input>
</div>
*/

/**
* @component input
* @section warning
* @angular
*
<div>
  <md-input
    inputSize="small-5"
    label="Error (Warning) Input"
    [errorArr]="[{error: 'This is where the success message would be.', type: 'warning'}]"
  >
  </md-input>
</div>
*/

/**
* @component input
* @section success
* @angular
*
<div>
  <md-input
    inputSize="small-5"
    label="Error (Success) Input"
    [errorArr]="[{error: 'This is where the success message would be.', type: 'success'}]"
  >
  </md-input>
</div>
*/

/**
* @component input
* @section disabled
* @angular
*
<div>
  <md-input
    inputSize="small-5"
    [disabled]="true"
    label="Disabled Input"
  >
  </md-input>
</div>
*/

/**
* @component input
* @section read-only
* @angular
*
<div>
  <md-input
    inputSize="small-5"
    [readOnly]="true"
    label="Read Only Input"
    [(ngModel)]="dataModel"
  >
  </md-input>
</div>
*/

/**
* @component input
* @section help-text
* @angular
*
<div>
  <md-input
    inputSize="small-5"
    inputHelpText="Help Text"
    label="Help Text Input"
  >
  </md-input>
</div>
*/

/**
* @component input
* @section secondary-label
* @angular
*
<div>
  <md-input
    inputSize="small-5"
    secondaryLabel="Secondary Label"
  >
  </md-input>
</div>
*/
