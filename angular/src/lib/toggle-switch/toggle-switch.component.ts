import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CUSTOM_TOGGLE_SWITCH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleSwitchComponent),
  multi: true
};

@Component({
  selector: 'cui-toggle-switch',
  template: `
    <input
      class="cui-input cui-toggle-switch__input"
      type="checkbox"
      (change)="onSwitch($event)"
      [attr.id]="htmlId"
      [attr.name]="name"
      [attr.tabindex]="tabIndex"
      [checked]="checked"
      [disabled]="disabled"
    />
    <label class="cui-toggle-switch__label" [attr.for]="htmlId">
      <span class="cui-toggle-switch__label__container"></span>
      <span class="cui-toggle-switch__label__text">{{label}}</span>
    </label>
  `,
  styles: [],
  host: {
    class: 'cui-input-group cui-toggle-switch'
  },
  providers: [CUSTOM_TOGGLE_SWITCH_VALUE_ACCESSOR]
})
export class ToggleSwitchComponent implements ControlValueAccessor {
  /** @prop Optional CSS class name | '' */
  @Input() class: string = '';
  /** @prop Sets the attribute disabled to the ToggleSwitch | false */
  @Input() disabled: boolean = false;
  /** @prop Unique HTML ID used for tying label to HTML input for automated testing */
  @Input() htmlId: string = '';
  /** @prop ToggleSwitch label text | '' */
  @Input() label: string = '';
  /** @prop ToggleSwitch name for group | '' */
  @Input() name: string = '';
  /** @prop index of the ToggleSwitch in tab order */
  @Input() tabIndex: number;
  /** @prop String value that corresponds with ToggleSwitch button | '' */
  @Input() value: any = '';

  /** @prop Callback function invoked when user clicks the ToggleSwitch button | null */
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  //pass in boolean to ngModel for filled.
  checked: boolean = false;

  public onSwitchChange: Function = () => {};

  public onSwitchTouch: Function = () => {};


  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() { }

  writeValue(checked: any) : void {
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
      const isChecked = (<HTMLInputElement> event.target).checked;
      this.updateSwitch(event, isChecked);
    }
  }

  updateSwitch(event: Event, bool: boolean) {
    this.checked = bool;

    this.onSwitchChange(this.checked);

    this.onChange.emit({switchEvent: event, checked: this.checked});
  }
}