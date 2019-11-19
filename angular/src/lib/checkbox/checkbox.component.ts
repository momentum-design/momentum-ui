/** @component checkbox */
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
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
      [ngClass]="[indeterminate ? 'indeterminate' : '', className]"
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
      class="md-checkbox__label"
      [attr.for]="htmlId"
      (click)="onClick($event)"
    >
      <span>{{ label }}</span>
    </label>
    <md-input-helper *ngIf="helpText">{{ helpText }}</md-input-helper>
    <ng-content></ng-content>
  `,
  styles: [],
  providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR],
  host: {
    class: 'md-input-container md-checkbox',
  },
})
export class CheckboxComponent implements ControlValueAccessor {
  /** @prop indicates if single checkbox not in checkbox group | false */
  @Input() solo: boolean = false;
  /** @prop Optional CSS class name on checkbox input | '' */
  @Input() className: string = '';
  /** @prop String value that corresponds with Checkbox  | '' */
  @Input() value: any = '';
  /** @prop index of the checkbox in tab order */
  @Input() tabIndex: number = 0;
  /** @prop angular form control */
  @Input() formControl: FormControl;
  /** @prop Optional css class string | ''  */
  @Input() public class: string = '';
  /** @prop Sets the disabled attribute of the Input | false */
  @Input() public disabled: boolean = false;
  /** @prop Help Text to appear under the radio | '' */
  @Input() public helpText: string = '';
  /** @prop Optional indeterminate capabilities of checkbox | false */
  @Input() public indeterminate: boolean = false;
  /** @prop Input label text | '' */
  @Input() public label: string = '';
  /** @prop Optional required setting for Checkbox input | false */
  @Input() public required: boolean = false;
  /** @prop Unique HTML ID. Used for tying label to HTML input | '' */
  @Input() public htmlId: string = '';
  /** @prop sets value of the Checkbox input element | false */
  @Input() public selectedItem: boolean = false;
  /** @prop Sets the attribute name to the Checkbox input element | '' */
  @Input() public name: string = '';
  @Input() get checkStatus() {
    return this.checked;
  }

  set checkStatus(status) {
    if (status !== undefined) {
      this.checked = status;
      if (!this.disabled) {
        this.updateList();
      }
    }
  }

  private _nestedLevel: number;
  /** @prop Sets optional checkbox nestedLevel | null */
  @Input()
  set nestedLevel(nestedLevel: number) {
    if (this._nestedLevel) {
      this.elementRef.nativeElement.classList.remove(`md-input--nested-${this._nestedLevel}`);
    }
    this.elementRef.nativeElement.classList.add(`md-input--nested-${nestedLevel}`);
    this._nestedLevel = nestedLevel;
  }

  /** @prop optional emitter to invoke an checkStatusChange handler when checkbox toggles */
  @Output() checkStatusChange: EventEmitter<any> = new EventEmitter();

  checked: boolean = false;

  list: any;

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) {}

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

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onClick(e) {
    e.preventDefault();

    if (this.disabled) {
      return;
    }

    this.checked = !this.checked;

    if (this.checkStatusChange.observers.length > 0) {
      this.checkStatusChange.emit(this.checked);
    }
    this.updateList();
  }

  updateList() {
    if (this.indeterminate) {
      return;
    }
    if (this.solo) {
      this.onListChange(this.checked);
    } else {
      if (this.checked) {
        this.addCheck();
      } else {
        this.unCheck();
      }

      this.onListChange(this.list);

      if (this.formControl) {
        this.formControl.setValue(this.list);
      }
    }
  }

  handleChange(event) {
    this.checked = event.target.checked;

    this.updateList();
  }

  isChecked(): boolean {
    if (this.solo) {
      return this.list;
    } else {
      return this.list && this.list.includes(this.value);
    }
  }

  unCheck() {
    if (this.list) {
      this.list = this.list.filter(check => check !== this.value);
    }
  }

  addCheck() {
    if (this.list) {
      this.list = [...this.list, this.value];
    } else {
      this.list = [this.value];
    }
  }
}
