import { Component, Input, forwardRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};

@Component({
  selector: 'cui-checkbox',
  template: `
    <div
      class="cui-input-group cui-checkbox"
      [ngClass]="wrapperClasses"
    >
      <input
        class="cui-input cui-checkbox__input"
        [ngClass]="inputClasses"
        type="checkbox"
        (change)="handleChange($event)"
        [value]="value"
        [checked]="checked"
        [name]="name"
        [attr.id]="htmlId"
        [attr.tabindex]="tabindex"
        [disabled]="disabled"
        [required]="required"
      />

      <label
        *ngIf="label"
        class="cui-checkbox__label"
        for="htmlId"
        (click)="onClick($event)"
      >
        <span>{{label}}</span>
      </label>

      <ng-content></ng-content>
    </div>
  ` ,
  styles: [],
  providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR]
})
export class CheckboxComponent implements ControlValueAccessor {

  /** @prop String value that corresponds with Checkbox  | '' */
  @Input() value: any = '';
  /** @prop index of the checkbox in tab order */
  @Input() tabindex: number = 0;
  /** @prop angular form control */
  @Input() formControl: FormControl;
  /** @prop Optional css class string | ''  */
  @Input() public class: string = '';
  /** @prop Sets the disabled attribute of the Input | false */
  @Input() public disabled: boolean = false;
  /** @prop Optional indeterminate capabilities of checkbox | false */
  @Input() public indeterminate: boolean = false;
  /** @prop Input label text | '' */
  @Input() public label: string = '';
  /** @prop Set the level of nested checkboxes | 0 */
  @Input() public nestedLevel: number = 0;
  /** @prop Optional required setting for Checkbox input | false */
  @Input() public required: boolean = false;
  /** @prop Unique HTML ID. Used for tying label to HTML input | '' */
  @Input() public htmlId: string = '';
  /** @prop sets value of the Checkbox input element | false */
  @Input() public selectedItem: boolean = false;
  /** @prop Sets the attribute name to the Checkbox input element | '' */
  @Input() public name: string = '';

  /** @prop optional emitter to invoke an onChange handler when checkbox toggles */
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  list: any;

  checked: boolean = false;


  constructor(private cdr: ChangeDetectorRef) { }

  onListChange: Function = () => {};

  onListTouched: Function = () => {};

  writeValue(list: any) : void {
    this.list = list;
    this.checked = this.isChecked();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onListChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onListTouched = fn;
  }

  onClick(e) {
    event.preventDefault();

    if(this.disabled) {
      return;
    }

    this.checked = !this.checked;
    this.updateList();
  }

  updateList() {

    if(this.indeterminate){
      return;
    }

    if(this.checked){
      this.addCheck();
    }
    else{
      this.uncheck();
    }

    this.onListChange(this.list);

    if(this.formControl) {
      this.formControl.setValue(this.list);
    }
    this.onChange.emit(this.checked);
  }

  handleChange(event) {
    this.checked = event.target.checked;
    this.updateList();
  }

  isChecked(): boolean {
    return this.list && this.list.includes(this.value);
  }

  uncheck() {
    this.list = this.list.filter(check => check !== this.value);
  }

  addCheck() {
    if(this.list){
      this.list = [...this.list, this.value];
    }
    else {
      this.list = [this.value];
    }
  }

  get wrapperClasses() {
    return {
      ['cui-input--nested-' + this.nestedLevel]: this.nestedLevel,
      [this.class]: this.class,
    };
  }

  get inputClasses() {
    return {
      ['indeterminate']: this.indeterminate,
    };
  }
}