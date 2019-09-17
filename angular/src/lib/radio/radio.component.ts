/** @component radio */

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// tslint:disable:no-use-before-declare
const CUSTOM_RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioComponent),
  multi: true,
};
// tslint:enable:no-use-before-declare
@Component({
  selector: 'md-radio',
  template: `
    <input
      class="md-input md-radio__input"
      [ngClass]="[className]"
      type="radio"
      #radioInput
      (change)="onToggle($event)"
      [attr.id]="htmlId"
      [attr.name]="name"
      [attr.tabindex]="tabIndex"
      [attr.value]="value"
      [checked]="checked"
      [disabled]="disabled"
    />

    <label class="md-radio__label" (radioClick)="onToggle($event)" [attr.for]="htmlId">
      <span>{{ label }}</span>
    </label>

    <ng-content></ng-content>
  `,
  styles: [],
  providers: [CUSTOM_RADIO_VALUE_ACCESSOR],
  host: {
    class: 'md-input-group md-radio',
  },
})
export class RadioComponent implements ControlValueAccessor {
  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) {}

  /** @option Optional CSS class name on individual radio input | '' */
  @Input() className: string = '';
  /** @option Sets the attribute disabled to the Radio | false */
  @Input() disabled: boolean = false;
  /** @option Help Text to appear under the radio | '' */
  @Input() public helpText: string = '';
  /** @option Unique HTML ID used for tying label to HTML input for automated testing */
  @Input() htmlId: string = '';
  /** @option Radio label text | '' */
  @Input() label: string = '';
  /** @option Radio name for group | '' */
  @Input() name: string = '';
  /** @option index of the radio in tab order */
  @Input() tabIndex: number;
  /** @option String value that corresponds with Radio button | '' */
  @Input() value: any = '';

  /** @option Set the level of nested radio | 0 */
  private _nestedLevel: number;
  @Input()
  set nestedLevel(nestedLevel: number) {
    if (this._nestedLevel) {
      this.elementRef.nativeElement.classList.remove(`md-input--nested-${this._nestedLevel}`);
    }
    this.elementRef.nativeElement.classList.add(`md-input--nested-${nestedLevel}`);
    this._nestedLevel = nestedLevel;
  }

  /** @option Callback function invoked when user clicks the Radio button | null */
  @Output() radioClick: EventEmitter<any> = new EventEmitter();

  @ViewChild('radioInput') radioViewChild: ElementRef;

  public checked: boolean;

  public onChangeCallback: Function = () => {};

  public onTouchedCallback: Function = () => {};

  onToggle(e) {
    if (!this.disabled) {
      this.radioViewChild.nativeElement.checked = true;
      this.checked = true;
      this.onChangeCallback(this.value);
      this.radioClick.emit();
    }
  }

  writeValue(value: any): void {
    this.checked = value === this.value;

    if (this.radioViewChild.nativeElement) {
      this.radioViewChild.nativeElement.checked = this.checked;
    }

    this.cdr.markForCheck();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnTouched(fn: Function): void {
    this.onTouchedCallback = fn;
  }

  registerOnChange(fn: Function): void {
    this.onChangeCallback = fn;
  }
}
