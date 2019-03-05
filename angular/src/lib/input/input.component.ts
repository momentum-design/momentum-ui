import { Component, OnInit, Input, OnChanges, SimpleChanges, forwardRef, Output, EventEmitter, Optional, Self} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';

const cb = () => {};

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'cui-input',
  templateUrl: './input.component.html',
  // providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class InputComponent implements ControlValueAccessor {
  //internal value model
  private innerValue: any = '';

  private onTouchedCallback: () => void = cb;
  private onChangeCallback: (_: any) => void = cb;

  //get accessor
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

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
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

  /** @option Optional css class string | ''  */
  @Input() public class: string = '';
  /** @option Sets the disabled attribute of the Input | false */
  @Input() public disabled: boolean = false;
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
  @Input() public placeholder: string = "";
  /** @option Determines if Input can be edited | false */
  @Input() public readOnly: boolean = false;
  /** @option Secondary Input label | ''  */
  @Input() public secondaryLabel: string = '';
  /** @option Input color theme | '' */
  @Input() public theme: string;
  /** @option Input type | 'text' */
  @Input() public type: string = "text";
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


