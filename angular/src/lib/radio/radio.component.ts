import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

const CUSTOM_RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioComponent),
  multi: true
};

@Component({
  selector: 'cui-radio',
  template: `
    <div class="cui-radio-group">
      <div
        class="cui-input-group cui-radio"
        [ngClass]="wrapperClasses"
      >

        <input
          class="cui-input cui-radio__input"
          type="radio"
          #radioInput
          (change)="onToggle($event)"
          [attr.id]="htmlId"
          [attr.name]="name"
          [attr.tabindex]="tabindex"
          [attr.value]="value"
          [checked]="checked"
          [disabled]="disabled"
        />

        <label
          class="cui-radio__label"
          (click)="onToggle($event)"
          [attr.for]="htmlId"
        >
          <span>{{label}}</span>
        </label>

      </div>

      <ng-content></ng-content>
    </div>
  `,
  styles: [],
  providers: [CUSTOM_RADIO_VALUE_ACCESSOR]
})
export class RadioComponent implements ControlValueAccessor {
  /** @prop Optional CSS class name | '' */
  @Input() class: string = '';
  /** @prop Sets the attribute disabled to the Radio | false */
  @Input() disabled: boolean = false;
    /** @prop Unique HTML ID used for tying label to HTML input for automated testing */
  @Input() htmlId: string = '';
  /** @prop Radio label text | '' */
  @Input() label: string = '';
  /** @prop Radio name for group | '' */
  @Input() name: string = '';
  /** @prop index of the radio in tab order */
  @Input() tabindex: number;
  /** @prop String value that corresponds with Radio button | '' */
  @Input() value: any = '';
  /** @prop Set the level of nested radio | 0 */
  @Input() nestedLevel: number = 0;

  /** @prop Callback function invoked when user clicks the Radio button | null */
  @Output() onClick: EventEmitter<any> = new EventEmitter();


  @ViewChild('radioInput') radioViewChild: ElementRef;

  public onChangeCallback: Function = () => {};

  public onTouchedCallback: Function = () => {};

  public checked: boolean;

  constructor(private cdr: ChangeDetectorRef) {}

  onToggle(e) {
    if(!this.disabled) {
      this.radioViewChild.nativeElement.checked = true;
      this.checked = true;
      this.onChangeCallback(this.value);
      this.onClick.emit();
    }
  }

  writeValue(value: any) : void {
    this.checked = (value == this.value);

    if(this.radioViewChild.nativeElement) {
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

  get wrapperClasses() {
    return {
      ['cui-input--nested-' + this.nestedLevel]: this.nestedLevel,
      [this.class]: this.class,
    };
  }

}
