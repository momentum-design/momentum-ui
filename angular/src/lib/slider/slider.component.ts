import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  Provider,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SliderPointerChange } from './slider-pointer.component';
import isObject from 'lodash-es/isObject';

// tslint:disable:no-use-before-declare
const CUI_SLIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderComponent),
  multi: true,
};
// tslint:enable:no-use-before-declare

export interface SliderChange {
  high: number;
  low: number;
}

@Component({
  selector: 'cui-slider',
  template: `
    <span #sliderBar class="cui-slider__bar"></span>
    <span
      class="cui-slider__selection"
      [ngStyle]="{ 'left.%': selectionLeft, 'width.%': selectionWidth }"
    ></span>
    <cui-slider-pointer
      *ngIf="isObject(value)"
      [position]="sliderLowPosition"
      (move)="onSliderMove('sliderLow', $event)"
    ></cui-slider-pointer>
    <cui-slider-pointer
      [position]="sliderHighPosition"
      (move)="onSliderMove('sliderHigh', $event)"
    ></cui-slider-pointer>
    <div #ticksContainer>
      <span *ngFor="let tickValue of scale" class="cui-slider__hashlabel">{{
        (translateFn && translateFn(tickValue)) || tickValue
      }}</span>
    </div>
  `,
  host: {
    class: 'cui-slider',
    '[class.cui-slider--disabled]': 'disabled',
  },
  providers: [CUI_SLIDER_VALUE_ACCESSOR],
})
export class SliderComponent
  implements AfterViewInit, OnInit, ControlValueAccessor {
  /** @prop Determines if minimum pointer can cross over maximum pointer | false */
  @Input() canCross: boolean = false;
  /** @prop Set the attribute disabled to Slider | false */
  @Input() disabled: boolean = false;
  /** @prop Set the initial maximum value */
  @Input() max: number;
  /** @prop Set the initial minimum value | 0 */
  @Input() min: number = 0;
  /** @prop Set visual step measurement | 1 */
  @Input() step: number = 1;
  /** @prop Set increment of x-axis labels | 0 */
  @Input() tick: number = 0;
  /** @prop Function to compute layout of Slider | null */
  @Input() translateFn: Function | null;
  /** @prop Set either maximum pointer value or a combination of high and low pointer values | 0 */
  @Input()
  get value(): SliderChange | number {
    return this._value;
  }
  set value(value) {
    if (this._value !== value) {
      this._value = value;
      this.sliderLow =
        (isObject(this.value) && (this.value as SliderChange).low) || this.min;
      this.sliderHigh =
        (isObject(this.value) && (this.value as SliderChange).high) ||
        (this.value as number);
      this.returnCurrentValues();
      this.changeDetectorRef.markForCheck();
    }
  }
  /** Event emitted when change a pointer position */
  @Output() readonly change: EventEmitter<
    SliderChange | number
  > = new EventEmitter<SliderChange | number>();

  @ViewChild('sliderBar') private sliderBar: ElementRef;
  @ViewChild('ticksContainer') private ticksContainer: ElementRef;

  private _value: SliderChange | number = 0;
  private _sliderLow: number;
  private _sliderHigh: number;

  get sliderLow(): number {
    return this._sliderLow;
  }
  set sliderLow(value) {
    this._sliderLow = value;
  }
  get sliderHigh(): number {
    return this._sliderHigh;
  }
  set sliderHigh(value) {
    this._sliderHigh = value;
  }
  get sliderLowPosition() {
    return ((this.sliderLow - this.min) / (this.max - this.min)) * 100;
  }
  get sliderHighPosition() {
    return ((this.sliderHigh - this.min) / (this.max - this.min)) * 100;
  }

  scale: number[];
  selectionLeft: number;
  selectionWidth: number;
  isObject: Function;

  private _change(_: any) {}

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.max) {
      throw new Error('Initial maximum(max) value is required');
    }
    this.isObject = isObject;
    this.scale = [this.min, this.max];

    this.getScale(this.min, this.max, this.tick);
    this.getSelectionWidth();
  }

  ngAfterViewInit() {
    this.setScalePos(this.scale, this.min, this.max);
  }

  writeValue(value: any): void {
    if (value !== null) {
      this.value = value;
    }
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: any): void {
    this._change = fn;
  }

  registerOnTouched(_: any): void {}

  setScalePos(scale: number[], min: number, max: number) {
    this.ticksContainer.nativeElement
      .querySelectorAll('span')
      .forEach((child: HTMLElement, idx: number) => {
        const leftValue = `${((scale[idx] - min) / max) * 100}%`;
        child.style.left = `calc(${leftValue} - ${child.offsetWidth / 2}px)`;
      });
  }

  getScale(low: number = 0, high: number, tick: number) {
    if (this.tick > 0) {
      let value = high;
      const ticksArray: number[] = [high];
      while (value > 0 && value - tick >= low) {
        value -= tick;
        ticksArray.unshift(Math.abs(Math.round(value / tick) * tick));
      }
      this.scale = ticksArray;
    }
  }

  getSliderWidth() {
    return this.sliderBar.nativeElement.getBoundingClientRect().width;
  }

  getStepWidth() {
    const maxValue = this.max - this.min;
    const maxWidth = this.getSliderWidth();
    return (this.step / maxValue) * maxWidth;
  }

  getSteps(position: SliderPointerChange) {
    if (position.isKeyBoard) {
      return 1;
    }
    const diff =
      position.direction === 1
        ? position.to - position.from
        : position.from - position.to;
    if (diff < 0) {
      return 0;
    }
    const steps = diff / this.getStepWidth();
    return steps - Math.floor(steps) >= 0.5
      ? Math.ceil(steps)
      : Math.floor(steps);
  }

  getLimit(pointerKey: string, direction: number) {
    if (pointerKey === 'sliderLow') {
      return this.canCross
        ? direction === 1
          ? this.max
          : this.min
        : direction === 1
        ? this.sliderHigh
        : this.min;
    } else if (pointerKey === 'sliderHigh') {
      return this.canCross
        ? direction === 1
          ? this.max
          : this.min
        : direction === 1
        ? this.max
        : this.sliderLow;
    }
  }

  returnCurrentValues() {
    this.getSelectionWidth();
    const value = isObject(this.value)
      ? {
          low: Math.min(this.sliderHigh, this.sliderLow),
          high: Math.max(this.sliderHigh, this.sliderLow),
        }
      : this.sliderHigh;
    this._change(value);
    this.change.emit(value);
  }

  moveForward(key: string, pixelMove: number, limit: number) {
    const newPosition =
      this[key] + pixelMove <= limit ? this[key] + pixelMove : limit;

    this[key] = newPosition;
    this.returnCurrentValues();
  }

  moveBack(key: string, pixelMove: number, limit: number) {
    const newPosition =
      this[key] - pixelMove >= limit ? this[key] - pixelMove : limit;

    this[key] = newPosition;
    this.returnCurrentValues();
  }

  onSliderMove(key: string, position: SliderPointerChange) {
    if (this.disabled) {
      return;
    }
    const limit = this.getLimit(key, position.direction);
    const pixelMove = this.getSteps(position) * this.step;

    position.direction === 1
      ? this.moveForward(key, pixelMove, limit)
      : this.moveBack(key, pixelMove, limit);
  }

  getSelectionWidth() {
    const baseValue = Number.isInteger(this.sliderLow)
      ? this.sliderLow
      : this.min;
    this.selectionLeft =
      ((Math.min(baseValue, this.sliderHigh) - this.min) / this.max) * 100;
    this.selectionWidth =
      (Math.abs(this.sliderHigh - baseValue) / this.max) * 100;
  }
}
