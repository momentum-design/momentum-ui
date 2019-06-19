/** @component checkbox */
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl,
} from '@angular/forms';

// tslint:disable:no-use-before-declare
const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true,
};
// tslint:enable:no-use-before-declare

@Component({
  selector: 'md-checkbox',
  template: `
    <input
      class="md-input md-checkbox__input"
      [ngClass]="[
        indeterminate ? 'indeterminate': '',
        className
      ]"
      type="checkbox"
      (change)="handleChange($event)"
      [value]="value"
      [checked]="checked"
      [name]="name"
      [attr.id]="htmlId"
      [attr.tabindex]="tabIndex"
      [disabled]="disabled"
      [required]="required"
    />

    <label
      *ngIf="label"
      class="md-checkbox__label"
      [attr.for]="htmlId"
      (click)="onClick($event)"
    >
      <span>{{ label }}</span>
    </label>

    <ng-content></ng-content>
  `,
  styles: [],
  providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR],
  host: {
    class: 'md-input-group md-checkbox',
  }
})
export class CheckboxComponent implements ControlValueAccessor {
  /** @option Optional CSS class name on checkbox input | '' */
  @Input() className: string = '';
  /** @option String value that corresponds with Checkbox  | '' */
  @Input() value: any = '';
  /** @option index of the checkbox in tab order */
  @Input() tabIndex: number = 0;
  /** @option angular form control */
  @Input() formControl: FormControl;
  /** @option Optional css class string | ''  */
  @Input() public class: string = '';
  /** @option Sets the disabled attribute of the Input | false */
  @Input() public disabled: boolean = false;
  /** @option Optional indeterminate capabilities of checkbox | false */
  @Input() public indeterminate: boolean = false;
  /** @option Input label text | '' */
  @Input() public label: string = '';
  /** @option Optional required setting for Checkbox input | false */
  @Input() public required: boolean = false;
  /** @option Unique HTML ID. Used for tying label to HTML input | '' */
  @Input() public htmlId: string = '';
  /** @option sets value of the Checkbox input element | false */
  @Input() public selectedItem: boolean = false;
  /** @option Sets the attribute name to the Checkbox input element | '' */
  @Input() public name: string = '';
  @Input() get checkStatus () {
    return this.checked;
  }

  set checkStatus (status) {
    if (status !== undefined && !this.disabled) {
      this.checked = status;
      this.checkStatusChange.emit(this.checked);
      this.updateList();
    }
  }

  private _nestedLevel: number;
  /** @option Sets optional checkbox nestedLevel | null */
  @Input()
  set nestedLevel(nestedLevel: number) {
    if (this._nestedLevel) {
      this.elementRef.nativeElement.classList.remove(
        `md-input--nested-${this._nestedLevel}`
      );
    }
    this.elementRef.nativeElement.classList.add(`md-input--nested-${nestedLevel}`);
    this._nestedLevel = nestedLevel;
  }

  /** @prop optional emitter to invoke an checkStatusChange handler when checkbox toggles */
  @Output() checkStatusChange: EventEmitter<any> = new EventEmitter();

  checked: boolean = false;

  list: any;

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) { }

  onListChange: Function = () => {};

  onListTouched: Function = () => {};

  writeValue(list: any): void {
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
    e.preventDefault();

    if (this.checkStatusChange.observers.length > 0) {
      return;
    }

    if (this.disabled) {
      return;
    }

    this.checked = !this.checked;
    this.updateList();
  }

  updateList() {
    if (this.indeterminate) {
      return;
    }

    if (this.checked) {
      this.addCheck();
    } else {
      this.uncheck();
    }

    this.onListChange(this.list);

    if (this.formControl) {
      this.formControl.setValue(this.list);
    }
    this.checkStatusChange.emit(this.checked);
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
    if (this.list) {
      this.list = [...this.list, this.value];
    } else {
      this.list = [this.value];
    }
  }
}
