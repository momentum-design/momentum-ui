/** @component button */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
} from '@angular/core';

export type ButtonType = 'button' | 'reset' | 'submit';

@Component({
  selector: 'button[md-button], a[md-button], input[md-button]',
  exportAs: 'mdButton',
  template: `
    <md-loading *ngIf="loading"></md-loading>
    <span class="md-button__children" [ngStyle]="{ opacity: opacity }">
      <ng-content></ng-content>
    </span>
  `,
  host: {
    '[attr.active]': 'active',
    '[attr.disabled]': 'disabled || loading || null',
    '[attr.href]': 'href',
    '[attr.tabindex]': 'index === focusIndex ? 0 : -1',
    '[attr.type]': 'type',
    'class': 'md-button md-button--36',
    '[class.active]': 'active && !disabled',
    '[class.md-button--circle]': 'circle',
    '[class.md-button--disabled]': 'disabled || loading',
    '[class.md-button--expand]': 'expand',
    '[class.md-button--none]': 'removeStyle',
  }
})
export class ButtonComponent implements AfterViewInit {
  /** @option Active Sets button to active | false */
  @Input() active: boolean = false;
  /** @option Creates a circle shaped button | false */
  @Input() circle: boolean = false;
  /** @option Sets optional button color | '' */
  @Input()
  get color(): string {
    if (this.removeStyle) {
      this.color = null;
      return null;
    }
    return this._color;
  }
  set color(value: string) {
    const colorName = (name: string) => name === 'none' ? 'color-none' : name;
    if (this._color) {
      this.el.nativeElement.classList.remove(`md-button--${colorName(this._color)}`);
    }
    if (value && !this.removeStyle) {
      this.el.nativeElement.classList.add(`md-button--${colorName(value)}`);
    }
    this._color = value;
  }
  /** @option Sets the attribute disabled to Button | false */
  @Input() disabled: boolean = false;
  /** @option Sets expand css styling to widen the Button | false */
  @Input() expand: boolean = false;
  /** @option Sets href for an anchor tagged button | '' */
  @Input() href: string = '';
  /** @option Activates the loading animation and sets the button to disabled | false */
  @Input() loading: boolean = false;
  /** @option Boolean to remove Button's default style | false */
  @Input()
  get removeStyle(): boolean {
    return this._removeStyle;
  }
  set removeStyle(value: boolean) {
    if (value) {
      this.color = null;
      this.size = null;
    }
    this._removeStyle = value;
  }
  /** @option Size value | '36' */
  @Input()
  get size(): number | string {
    if (this.removeStyle) {
      this.size = null;
      return null;
    }
    return this._size;
  }
  set size(value: number | string) {
    const sizeName = (name: number | string) => name === 'none' ? 'size-none' : name;
    if (this._size) {
      this.el.nativeElement.classList.remove(`md-button--${sizeName(this._size)}`);
    }
    this._size = value;
    if (!this.circle && !this.checkButtonSize(value)) {
      console.warn(
        `[@collab-ui/angular] Button: selected size is not supported
         for non-circular button. Size will default to 36`
      );
      this._size = 36;
    }
    if (this._size && !this.removeStyle) {
      this.el.nativeElement.classList.add(`md-button--${sizeName(this._size)}`);
    }
  }
  /** @option Html button type | 'button' */
  @Input() type: ButtonType = 'button';

  private _color: string = '';
  private _focusIndex: number;
  private _prevFocusIndex: number;
  private _removeStyle: boolean = false;
  private _size: number | string = 36;
  private _width: string;
  public focusOnLoad: boolean;
  public index: number;

  get focusIndex(): number {
    return this._focusIndex;
  }
  set focusIndex(value: number) {
    this._focusIndex = value;
    if (this.index === this._focusIndex && this._focusIndex !== this._prevFocusIndex) {
      this.el.nativeElement.focus();
    }
    this._prevFocusIndex = this._focusIndex;
  }
  get hostElement(): ElementRef {
    return this.el;
  }
  get opacity(): number {
    return this.loading ? 0 : 1;
  }
  get width(): string {
    return this._width;
  }
  set width(value: string) {
    this._width = value;
    this.el.nativeElement.style.width = value;
  }

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkAriaLabel();

      if (this.focusOnLoad && this.focusIndex === this.index) {
        this.el.nativeElement.focus();
      }
    }, 0);
  }

  private checkButtonSize(size: number | string): boolean {
    return [null, 'none', '28', '36', '40', '52', 28, 36, 40, 52].includes(size);
  }

  private checkAriaLabel() {
    const ariaLabel = this.getAttr('aria-label');
    if (!ariaLabel && this.el.nativeElement.children.length > 0) {
      throw new Error(
        'md-button: content is not a string, you must add an "ariaLabel" for accessibility.'
      );
    }
  }

  private getAttr(attr: string) {
    return this.el.nativeElement.getAttribute(attr);
  }
}
