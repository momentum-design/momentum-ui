/** @component radio */

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// tslint:disable:no-use-before-declare
const CUSTOM_RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioComponent),
  multi: true,
};
// tslint:enable:no-use-before-declare

@Component({
  selector: 'cui-radio',
  template: `
    <div class="cui-radio-group">
      <div class="cui-input-group cui-radio" [ngClass]="wrapperClasses">
        <input
          class="cui-input cui-radio__input"
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

        <label
          class="cui-radio__label"
          (click)="onToggle($event)"
          [attr.for]="htmlId"
        >
          <span>{{ label }}</span>
        </label>
      </div>

      <ng-content></ng-content>
    </div>
  `,
  styles: [],
  providers: [CUSTOM_RADIO_VALUE_ACCESSOR],
})
export class RadioComponent implements ControlValueAccessor {
  constructor(private cdr: ChangeDetectorRef) {}

  get wrapperClasses() {
    return {
      ['cui-input--nested-' + this.nestedLevel]: this.nestedLevel,
      [this.class]: this.class,
    };
  }
  /** @option Optional CSS class name | '' */
  @Input() class: string = '';
  /** @option Sets the attribute disabled to the Radio | false */
  @Input() disabled: boolean = false;
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
  @Input() nestedLevel: number = 0;

  /** @option Callback function invoked when user clicks the Radio button | null */
  @Output() click: EventEmitter<any> = new EventEmitter();

  @ViewChild('radioInput') radioViewChild: ElementRef;

  public checked: boolean;

  public onChangeCallback: Function = () => {};

  public onTouchedCallback: Function = () => {};

  onToggle(e) {
    if (!this.disabled) {
      this.radioViewChild.nativeElement.checked = true;
      this.checked = true;
      this.onChangeCallback(this.value);
      this.click.emit();
    }
  }

  writeValue(value: any): void {
    this.checked = value === this.value;

    if (this.radioViewChild.nativeElement) {
      this.radioViewChild.nativeElement.checked = this.checked;
    }

    this.cdr.markForCheck();
  }

  registerOnTouched(fn: Function): void {
    this.onTouchedCallback = fn;
  }

  registerOnChange(fn: Function): void {
    this.onChangeCallback = fn;
  }
}
