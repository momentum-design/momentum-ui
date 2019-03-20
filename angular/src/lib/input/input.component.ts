import { Component, OnInit, Input, OnChanges, SimpleChanges, forwardRef, Output, EventEmitter, Optional, Self} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';

const cb = () => {};

@Component({
  selector: 'cui-input',
  template: `
    <div class="cui-input-group" [ngClass]="wrapperClasses">
      <cui-label *ngIf="label" [label]="label" className="cui-label" htmlFor="htmlId"></cui-label>

      <ng-container *ngIf="clear; else normal">
        <div class="cui-input__icon-container">
          <input
            *ngIf="!secondaryLabel"
            class="cui-input"
            [ngClass]="inputClasses"
            [(ngModel)]="value"
            [placeholder]="placeholder"
            [readonly]="readOnly"
            [attr.disabled]="disabled ? '' :null"
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
            class="cui-button cui-button--36 cui-button--icon"
            type="button"
            aria-label="clear input"
            (click)="handleClear()"
          >
            <span class="cui-button__children" style="opacity: 1;">
              <i class="cui-icon icon icon-clear-active_16 cui-input__icon-clear"></i>
            </span>
          </button>
        </div>
      </ng-container>

      <ng-template #normal>
        <input
          class="cui-input"
          [ngClass]="inputClasses"
          [(ngModel)]="value"
          [type]="type"
          [placeholder]="placeholder"
          [readonly]="readOnly"
          [attr.disabled]="disabled ? '' :null"
          (blur)="onBlur($event)"
          (focus)="onFocus($event)"
          (keydown)="onKeyDown($event)"
          (mousedown)="onMouseDown($event)"
          [name]="name"
          [attr.id]="htmlId"
        />
      </ng-template>

      <!-- Secondary Label -->
      <div class="cui-label__secondary-label-container" *ngIf="secondaryLabel">
        <input
          class="cui-input"
          [ngClass]="inputClasses"
          [(ngModel)]="value"
          [type]="type"
          [placeholder]="placeholder"
          [readonly]="readOnly"
          [attr.disabled]="disabled ? '' :null"
          (blur)="onBlur($event)"
          (focus)="onFocus($event)"
          (keydown)="onKeyDown($event)"
          (mousedown)="onMouseDown($event)"
          [name]="name"
          [attr.id]="htmlId"
        />

        <label class="cui-label__secondary-label" [attr.for]="htmlId">
          <span>{{secondaryLabel}}</span>
        </label>
      </div>

      <!-- Error Input -->
      <ng-container *ngIf="errors">
        <cui-input-error
          *ngFor="let error of errors"
          [error]="error"
        >
        </cui-input-error>
      </ng-container>

      <!-- Angular Control Error Validation Message  -->
      <div class="cui-input__messages" role="alert" *ngIf="control.invalid">
        <div class="message">{{errorValid}}</div>
      </div>

      <!-- Helper Text -->
      <cui-input-helper
        *ngIf="inputHelpText"
        [message]="inputHelpText"
      >
      </cui-input-helper>
    </div>
  `,
})

export class InputComponent implements ControlValueAccessor {

  private innerValue: any = '';

  private onTouchedCallback: () => void = cb;
  private onChangeCallback: (_: any) => void = cb;

  get value(): any {
    return this.innerValue;
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur(event) {
    this.handleBlur.emit()
    event.stopPropagation();
  }

  onFocus(event) {
    if(this.disabled) {
      event.stopPropagation();
      return;
    }
    this.handleFocus.emit();
  }

  onKeyDown(event){
    this.handleKeyDown.emit();
  }

  onMouseDown(event){
    if(this.disabled) {
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
  };

  private filterErrorsByType = (array, value) => {
    return array.reduce(
      (agg, e) => (e.type === value ? agg.concat(e.error) : agg),
      []
    );
  };

  get hasRequiredError() {
    return this.control.hasError('required');
  }

  get errorValid() {
    // if (this.control.pristine) {
    //   return '';
    // }
    for(let error in this.errorObj) {
      if (this.control.errors[error]) {
        return this.errorObj[error]
      }
    }
    return '';
  }

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
  @Input() public placeholder: string = "";
  /** @prop Determines if Input can be edited | false */
  @Input() public readOnly: boolean = false;
  /** @prop Secondary Input label | ''  */
  @Input() public secondaryLabel: string = '';
  /** @prop Input color theme | '' */
  @Input() public theme: string;
  /** @prop Input type | 'text' */
  @Input() public type: string = "text";
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

  constructor(@Optional() @Self() public control: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges){
    if(changes.errorArr){
      let changedArr = changes.errorArr.currentValue

      if(changedArr.length > 0){
        this.errorType = this.determineErrorType(changedArr);
        this.errors = this.errorType && this.filterErrorsByType(changedArr, this.errorType);
      }
    }
  }

  get wrapperClasses() {
    return {
      [this.inputSize + ' columns']: this.inputSize,
      'read-only': this.readOnly,
      'disabled': this.disabled,
      'error': Object.keys(this.errorObj).length > 0 && this.control.invalid && this.control.dirty,
      ['cui-input-group--' + this.theme]: this.theme,
      [this.errorType]: this.errorType,
      [this.class]: this.class
    };
  }

  get inputClasses() {
    return {
      [this.inputClass]: this.inputClass,
      'read-only': this.readOnly,
      'disabled': this.disabled,
      'dirty': this.value
    };
  }

  handleClear(){
    this.value = ""
  }
}

/**
* @component input
* @section default
* @angular
*

<div>
  <cui-input
    [(ngModel)]="dataModel"
    inputSize="small-5"
    label="Default Input"
  >
  </cui-input>
</div>
*/

/**
* @component input
* @section error
* @angular
*
<div>
  <cui-input
    inputSize="small-5"
    label="Error (Error) Input"
    [errorArr]="[{error: 'This is where the error message would be.', type: 'error'}]"
  >
  </cui-input>
</div>
*/

/**
* @component input
* @section warning
* @angular
*
<div>
  <cui-input
    inputSize="small-5"
    label="Error (Warning) Input"
    [errorArr]="[{error: 'This is where the success message would be.', type: 'warning'}]"
  >
  </cui-input>
</div>
*/

/**
* @component input
* @section success
* @angular
*
<div>
  <cui-input
    inputSize="small-5"
    label="Error (Success) Input"
    [errorArr]="[{error: 'This is where the success message would be.', type: 'success'}]"
  >
  </cui-input>
</div>
*/

/**
* @component input
* @section disabled
* @angular
*
<div>
  <cui-input
    inputSize="small-5"
    [disabled]="true"
    label="Disabled Input"
  >
  </cui-input>
</div>
*/

/**
* @component input
* @section read-only
* @angular
*
<div>
  <cui-input
    inputSize="small-5"
    [readOnly]="true"
    label="Read Only Input"
    [(ngModel)]="dataModel"
  >
  </cui-input>
</div>
*/

/**
* @component input
* @section help-text
* @angular
*
<div>
  <cui-input
    inputSize="small-5"
    inputHelpText="Help Text"
    label="Help Text Input"
  >
  </cui-input>
</div>
*/

/**
* @component input
* @section secondary-label
* @angular
*
<div>
  <cui-input
    inputSize="small-5"
    secondaryLabel="Secondary Label"
  >
  </cui-input>
</div>
*/


