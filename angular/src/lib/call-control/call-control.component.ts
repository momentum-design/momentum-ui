/** @component call-control */

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

export type CallControlSize =
| 'activities'
| 'camera'
| 'camera-muted'
| 'cancel'
| 'handset'
| 'microphone-muted'
| 'more'
| 'participant-list'
| 'share-screen'
| 'speaker'
| 'view-list';

const activeRed = ['camera-muted', 'cancel', 'microphone-muted', 'speaker'];
const activeBlue = ['camera', 'participant-list', 'share-screen'];

@Component({
  selector: 'md-call-control',
  template: `
    <button
      md-button
      [attr.aria-label]="ariaLabel || type"
      [attr.id]="id"
      [circle]="true"
      (click)="onClick($event)"
      [color]="type === 'cancel' ? 'red' : getColor()"
      [disabled]="disabled"
      [ngClass]="['md-call-control', hostClassName]"
      [size]="size"
    >
      <md-icon [name]="type + '_' + iconSize" [color]="iconColor"></md-icon>
    </button>
  `
})
export class CallControlComponent implements OnInit {
  /** @prop Sets active css styling | false */
  @Input() active: boolean = false;
  /** @prop Text to display for blindness accessibility features | '' */
  @Input() ariaLabel: string = '';
  /** @prop Sets the attribute disabled to the CallControl button | false */
  @Input() disabled: boolean = false;
  /** @prop Optional icon color prop | $md-white-100 */
  @Input() iconColor: string = 'white-100';
  /** @prop Optional numeric icon size prop | 24 */
  @Input() iconSize: number = 24;
  /** @prop Optional id string | null */
  @Input() id: string;
  /** @prop Optional numeric size prop for CallControl button | 56 */
  @Input() size: number | string = 56;
  /** @prop Optional predefined CallControl prop type | null */
  @Input() type: CallControlSize;

  @Output() readonly click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  hostClassName: string;

  constructor(private _element: ElementRef) {}

  ngOnInit() {
    this.hostClassName = this._element.nativeElement.className;
    const nativeElement: HTMLElement = this._element.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    parentElement.removeChild(nativeElement);
  }

  private _getActiveColor() {
    switch (true) {
      case(activeRed.includes(this.type)):
        return 'red';
      case(activeBlue.includes(this.type)):
        return 'blue';
      default:
        return 'dark-gray';
    }
  }

  getColor() {
    return this.active
      ? this._getActiveColor()
      : 'dark-gray';
  }

  onClick(event: MouseEvent) {
    this.click.emit(event);
  }
}
