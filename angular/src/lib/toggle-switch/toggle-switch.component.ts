/** @component toggle-switch */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// tslint:disable:no-use-before-declare
const CUSTOM_TOGGLE_SWITCH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleSwitchComponent),
  multi: true,
};
// tslint:enable:no-use-before-declare

@Component({
  selector: 'md-toggle-switch',
  template: `
    <input
      class="md-input md-toggle-switch__input"
      type="checkbox"
      (change)="onSwitch($event)"
      [attr.id]="htmlId"
      [attr.name]="name"
      [attr.tabindex]="tabIndex"
      [checked]="checked"
      [disabled]="disabled"
    />
    <label class="md-toggle-switch__label" [attr.for]="htmlId">
      <span class="md-toggle-switch__label__container"></span>
      <span class="md-toggle-switch__label__text">{{ label }}</span>
    </label>
  `,
  styles: [],
  host: {
    class: 'md-input-group md-toggle-switch',
  },
  providers: [CUSTOM_TOGGLE_SWITCH_VALUE_ACCESSOR],
})
export class ToggleSwitchComponent implements ControlValueAccessor {
  /** @option Optional CSS class name | '' */
  @Input() class: string = '';
  /** @option Sets the attribute disabled to the ToggleSwitch | false */
  @Input() disabled: boolean = false;
  /** @option Unique HTML ID used for tying label to HTML input for automated testing */
  @Input() htmlId: string = '';
  /** @option ToggleSwitch label text | '' */
  @Input() label: string = '';
  /** @option ToggleSwitch name for group | '' */
  @Input() name: string = '';
  /** @option index of the ToggleSwitch in tab order */
  @Input() tabIndex: number;
  /** @option String value that corresponds with ToggleSwitch button | '' */
  @Input() value: any = '';

  /** @option Callback function invoked when user clicks the ToggleSwitch button | null */
  @Output() change: EventEmitter<any> = new EventEmitter();

  // pass in boolean to ngModel for filled.
  checked: boolean = false;

  public onSwitchChange: Function = () => {};

  public onSwitchTouch: Function = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(checked: any): void {
    this.checked = checked;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onSwitchTouch = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onSwitchChange = fn;
  }

  onSwitch(event: Event) {
    if (!this.disabled) {
      const isChecked = (<HTMLInputElement>event.target).checked;
      this.updateSwitch(event, isChecked);
    }
  }

  updateSwitch(event: Event, bool: boolean) {
    this.checked = bool;

    this.onSwitchChange(this.checked);

    this.change.emit({ switchEvent: event, checked: this.checked });
  }
}
