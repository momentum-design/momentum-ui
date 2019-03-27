/** @component slider-pointer */

import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface SliderPointerChange {
  from?: number;
  to?: number;
  direction: number;
  isKeyBoard: boolean;
}

@Component({
  selector: 'cui-slider-pointer',
  template: ``,
  host: {
    class: 'cui-slider__pointer',
    role: 'button',
    tabindex: '0',
    '(keydown)': 'onKeydown($event)',
    '(mousedown)': 'onMousedown($event)',
    '(touchstart)': 'onTouchstart($event)',
    '(touchmove)': 'onTouchmove($event)',
  },
})
export class SliderPointerComponent {
  private _previousPosition: number;
  private _document: Document;

  /** @option Set Slider Pointer's position | 0 */
  @Input() position: number = 0;

  /** Event emitted when user moves the Slider Pointer */
  @Output() readonly move: EventEmitter<SliderPointerChange> = new EventEmitter<
    SliderPointerChange
  >();

  @HostBinding('style.left.%') get left(): number {
    return this.position;
  }

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) _document: any
  ) {
    this._document = _document;
  }

  getDirections(currentPos: number) {
    if (currentPos > this._previousPosition) {
      return 1;
    }
    return -1;
  }

  onKeydown(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp':
      case 'ArrowRight':
        this.move.emit({
          direction: 1,
          isKeyBoard: true,
        });
        event.preventDefault();
        break;

      case 'ArrowDown':
      case 'ArrowLeft':
        this.move.emit({
          direction: -1,
          isKeyBoard: true,
        });
        event.preventDefault();
        break;
    }
  }

  onMousedown(event: MouseEvent) {
    this._document.addEventListener('mousemove', this.onMousemove);
    this._document.addEventListener('mouseup', this.onMouseup);

    this._previousPosition = event.clientX;
  }

  onMousemove = (event: MouseEvent) => {
    const xPos = event.clientX;
    const direction = this.getDirections(xPos);

    this.move.emit({
      from: this.elementRef.nativeElement.getBoundingClientRect().left,
      to: xPos,
      direction: direction,
      isKeyBoard: false,
    });
  }

  onMouseup = (_: MouseEvent) => {
    this._document.removeEventListener('mousemove', this.onMousemove);
    this._document.removeEventListener('mouseup', this.onMouseup);
  }

  onTouchstart(event: TouchEvent) {
    this._previousPosition = event.touches[0].clientX;
  }

  onTouchmove(event: TouchEvent) {
    const xPos = event.touches[0].clientX;
    const direction = this.getDirections(xPos);

    this.move.emit({
      from: this.elementRef.nativeElement.getBoundingClientRect().left,
      to: xPos,
      direction: direction,
      isKeyBoard: false,
    });
  }
}
