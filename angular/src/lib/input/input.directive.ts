/** @component input */

import {
  DoCheck,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  SimpleChanges,
} from '@angular/core';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { getSupportedInputTypes, Platform } from '@angular/cdk/platform';
import { InputGroupService } from '../input-group';
import { InputService } from './input.service';
import { Subject } from 'rxjs';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NgControl,
  NgForm,
} from '@angular/forms';

let nextUniqueId = 0;

// Invalid input type. Using one of these will throw an MDInputUnsupportedTypeError.
const MD_INPUT_INVALID_TYPES = [
  'button',
  'checkbox',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit'
];

function getMDInputUnsupportedTypeError(type: string): Error {
  return Error(`Input type "${type}" isn't supported by mdInput.`);
}

@Directive({
  selector: `input[mdInput], textarea[mdInput]`,
  exportAs: 'mdInput',
  host: {
    '[attr.id]': 'id',
    '[attr.placeholder]': 'placeholder',
    '[attr.aria-describedby]': '_ariaDescribedby || null',
    '[disabled]': 'disabled',
    '[required]': 'required',
    '[readonly]': 'readonly || null',
    '(blur)': 'handleFocusChange(false)',
    '(focus)': 'handleFocusChange(true)',
    '(input)': 'handleInput()'
  },
  providers: [
    {provide: InputGroupService, useExisting: InputDirective}
  ]
})

export class InputDirective implements ControlValueAccessor, DoCheck, InputGroupService<any>, OnChanges, OnDestroy, OnInit {
  private _destroyed = new Subject<void>();
  private _inputValueAccessor: any;
  private _ngControl: any;
  private _parentForm: any;
  private _parentFormGroup: any;
  private _readonly = false;
  protected _disabled = false;
  protected _id: string;
  protected _previousNativeValue: any;
  protected _required = false;
  protected _type = 'text';
  protected _uid = `md-input-${nextUniqueId++}`;
  readonly stateChanges: Subject<void> = new Subject<void>();
  autofilled = false;
  _ariaDescribedby: string;
  _inputAfter = false;
  _inputBefore = false;
  focused: boolean = false;
  errorState: boolean = false;
  status: string;

  /*** @prop Unique HTML ID used for tying label to HTML input | 'md-in-<uniqueId>' */
  @Input()
  get id(): string { return this._id; }
  set id(value: string) { this._id = value || this._uid; }
  @Input()
  /*** @prop Sets the disabled attribute of the Input | false */
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);

    // Browsers may not fire the blur event if the input is disabled too quickly.
    // Reset from here to ensure that the element doesn't become stuck.
    if (this.focused) {
      this.focused = false;
      this.stateChanges.next();
    }
  }
  /*** @prop Placeholder text to display when Input is empty | '' */
  @Input() public placeholder: string = '';
  /*** @prop Determines if Input can be edited | false */
  @Input()
  get readonly(): boolean { return this._readonly; }
  set readonly(value: boolean) { this._readonly = coerceBooleanProperty(value); }
  /*** @prop Determines if Input is required | false */
  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }
  /** @prop Input shape property | '' */
  @Input() public shape: string = '';
  @Input()
  get type(): string { return this._type; }
  set type(value: string) {
    this._type = value || 'text';
    this._validateType();

    // When using Angular inputs, developers are no longer able to set the properties on the native
    // input element. To ensure that bindings for `type` work, we need to sync the setter
    // with the native property. Textarea elements don't support the type property or attribute.
    if (!this._isTextarea() && getSupportedInputTypes().has(this._type)) {
      (this._elementRef.nativeElement as HTMLInputElement).type = this._type;
    }
  }
  /*** @prop Input value | '' */
  @Input()
  get value(): string {
    return this._inputValueAccessor.value;
   }
  set value(value: string) {
    if (value !== this.value) {
      this._inputValueAccessor.value = value;
      this.stateChanges.next();
    }
  }

  protected _neverEmptyInputTypes = [
    'date',
    'datetime',
    'datetime-local',
    'month',
    'time',
    'week'
  ].filter(t => getSupportedInputTypes().has(t));

  @HostBinding('class') get _class(): string {
    return (
      'md-input' +
      `${this._isTextarea() ? ' md-input--multiline' : ''}` +
      `${this.shape ? ` md-input--${this.shape}` : ''}` +
      `${this._inputBefore ? ` md-input--before` : ''}` +
      `${this._inputAfter ? ` md-input--after` : ''}` +
      `${this.focused ? ` md-active` : ''}` +
      `${this.readonly ? ' md-read-only' : ''}` +
      `${this.disabled ? ' md-disabled' : ''}` +
      `${(this._ngControl && this._ngControl.dirty)  ? ` md-dirty` : ''}`
    );
  }

  constructor(
    protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    protected _platform: Platform,
    private _autofillMonitor: AutofillMonitor,
    private inputService: InputService,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective
  ) {

    const element = this._elementRef.nativeElement;

    this.id = this.id;
    this._inputValueAccessor = (ngControl && ngControl.valueAccessor) || element;
    this._parentForm = _parentForm;
    this._parentFormGroup = _parentFormGroup;
    this._ngControl = ngControl;

    this.inputService.addBeforePadding$
      .pipe(takeUntil(this._destroyed))
      .subscribe(value => this._inputBefore = coerceBooleanProperty(value));

    this.inputService.addAfterPadding$
      .pipe(takeUntil(this._destroyed))
      .subscribe(value => this._inputAfter = coerceBooleanProperty(value));
  }

  ngDoCheck() {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
    }
    // We need to dirty-check the native element's value, because there are some cases where
    // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
    // updating the value using `emitEvent: false`).
    this._dirtyCheckNativeValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.stateChanges.next();
  }

  ngOnInit() {
    if (this._platform.isBrowser) {
      this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(event => {
        this.autofilled = event.isAutofilled;
        this.stateChanges.next();
      });
    }
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this.stateChanges.complete();

    if (this._platform.isBrowser) {
      this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
  }

  protected _isNeverEmpty() {
    return this._neverEmptyInputTypes.indexOf(this._type) > -1;
  }

  /** Checks whether the input is invalid based on the native validation. */
  protected _isBadInput() {
    // The `validity` property won't be present on platform-server.
    const validity = (this._elementRef.nativeElement as HTMLInputElement).validity;
    return validity && validity.badInput;
  }

  protected _isTextarea() {
    return this._elementRef.nativeElement.nodeName.toLowerCase() === 'textarea';
  }

  protected _validateType() {
    if (MD_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
      throw getMDInputUnsupportedTypeError(this._type);
    }
  }

  get empty(): boolean {
    return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput() &&
        !this.autofilled;
  }

  /** Callback for the cases where the focused state of the input changes. */
  handleFocusChange(isFocused: boolean) {
    if (isFocused !== this.focused && (!this.readonly || !isFocused)) {
      this.focused = isFocused;
      this.stateChanges.next();
    }
  }

  handleInput() {
    // This is a noop function and is used to let Angular know whenever the value changes.
    // Angular will run a new change detection each time the `input` event has been dispatched.
    // It's necessary that Angular recognizes the value change, because when floatingLabel
    // is set to false and Angular forms aren't used, the placeholder won't recognize the
    // value changes and will not disappear.
    // Listening to the input event wouldn't be necessary when the input is using the
    // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDescribedByIds(ids: string[]) {
    this._ariaDescribedby = ids.join(' ');
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateErrorState() {
    const oldState = this.errorState;
    const parent = this._parentFormGroup || this._parentForm;
    const control = this.ngControl ? this.ngControl.control as FormControl : null;
    const newState = !!(
      control &&
      control.invalid &&
      (control.dirty || (parent && parent.submitted))
    );

    if (newState !== oldState) {
      this.errorState = newState;
      this.stateChanges.next();
    }
    return;
  }

  writeValue(value: any) {
    if (value !== this._inputValueAccessor.value) {
      this._inputValueAccessor.value = value;
    }
  }

  private _dirtyCheckNativeValue() {
    const newValue = this._elementRef.nativeElement.value;

    if (this._previousNativeValue !== newValue) {
      this._previousNativeValue = newValue;
      this.stateChanges.next();
    }
  }
}

