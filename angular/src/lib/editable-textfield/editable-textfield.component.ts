/** @component editable-textfield */

import {
  Input,
  Component,
  ElementRef,
  EventEmitter,
  Optional,
  Output,
  Self,
  ViewChild,
} from '@angular/core';

import { ControlValueAccessor, NgControl } from '@angular/forms';

const cb = () => {};

@Component({
  selector: 'md-editable-textfield',
  template: `
    <md-input-container
      *ngIf="isEditing"
      [class]="
        'md-editable-textfield__editing' +
        (className ? ' ' + className : '')
      "
      [containerSize]="containerSize"
      [inputSize]="inputSize"
    >
      <input
        mdInput
        #inputRef
        [class]="inputClass"
        [attr.id]="htmlId"
        [(ngModel)]="value"
        [placeholder]="placeholder"
        [readonly]="readOnly"
        [disabled]="disabled"
        [type]="type"
        [name]="name"
        (blur)="onBlur($event)"
        (focus)="onFocus($event)"
        (keydown)="onKeyDown($event)"
      />
    </md-input-container>

    <!-- Not in Edit Mode -->
    <div
      [hidden]="isEditing"
      class="md-editable-textfield__button"
      [ngClass]="[
        inputSize ? inputSize + ' columns' : '',
        buttonClass
      ]"
      role="button"
      tabindex="0"
      (click)="handleClick()"
      (keydown)="handleKey($event)"
    >
      {{ value }}
    </div>
  `,
  styles: [],
  host: {
    class: 'md-editable-textfield',
  },
})
export class EditableTextfieldComponent implements ControlValueAccessor {
  private _alignment: string = null;
  /** @option Sets optional button alignment | null */
  @Input()
  set alignment(alignment: string) {
    if (this._alignment) {
      this.elementRef.nativeElement.classList.remove(
        `md-editable-textfield--${this._alignment}`
      );
    }
    this.elementRef.nativeElement.classList.add(
      `md-editable-textfield--${alignment}`
    );
    this._alignment = alignment;
  }
  /** @option Optional css class name for non-edit text div | null */
  @Input() buttonClass: string = '';
  /** @option Optional css class string on div wrapping input | ''  */
  @Input() public className: string = '';
  /** @option Sets the disabled attribute of the Input | false */
  @Input() public disabled: boolean = false;
  /** @option Unique HTML ID used for tying label to HTML input for automated testing */
  @Input() public htmlId: string = '';
  /** @option Input css class name string */
  @Input() public inputClass: string = '';
  /** @option Overall input group size | '' */
  @Input() public containerSize: string = '';
  /** @option Input size | '' */
  @Input() public inputSize: string = '';
  /** @option Placeholder text to display when Input is empty | '' */
  @Input() public placeholder: string = '';
  /** @option Determines if Input can be edited | false */
  @Input() public readOnly: boolean = false;
  /** @option Input type | 'text' */
  @Input() public type: string = 'text';
  /** @option Sets the attribute name to the input element | '' */
  @Input() public name: string = '';

  /** @option Optional function after done editing */
  @Output() handleDoneEditing: EventEmitter<any> = new EventEmitter();

  @ViewChild('inputRef') inputRef: ElementRef;

  private innerValue: any = '';

  public isEditing: boolean = false;

  private onTouchedCallback: () => void = cb;
  private onChangeCallback: (_: any) => void = cb;

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  onKeyDown(e) {
    if (e.keyCode === 27) {
      this.isEditing = false;
    } else if (e.keyCode === 13) {
      this.handleEnter(e, e.target.value);
    }
  }

  handleEnter(e, value) {
    this.isEditing = false;
  }

  // keydown on non edit button
  handleKey(event) {
    if (!this.disabled) {
      if (
        (event.keyCode >= 65 && event.keyCode <= 90) ||
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        event.keyCode === 32
      ) {
        this.isEditing = true;
        setTimeout(() => this.inputRef.nativeElement.focus(), 100);
        this.value = this.value.concat(event.key);
      }
    }
  }

  onBlur(e) {
    this.isEditing = false;
    this.handleDoneEditing.emit(this.value);
    e.stopPropagation();
  }

  onFocus(event) {
    if (this.disabled) {
      event.stopPropagation();
      return;
    }
    this.isEditing = true;
  }

  constructor(
    @Optional() @Self() public control: NgControl,
    private elementRef: ElementRef
  ) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  handleClick = () => {
    if (this.disabled) {
      return;
    } else {
      this.isEditing = true;
      setTimeout(() => this.inputRef.nativeElement.focus(), 100);
    }
  }
}
