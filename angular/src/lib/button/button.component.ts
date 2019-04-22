/** @component button */
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  HostBinding,
  AfterViewInit,
  OnChanges,
  AfterContentInit,
} from '@angular/core';

@Component({
  selector: 'button[md-button], a[md-button], input[md-button]',
  exportAs: 'mdButton',
  template: `
    <div #divBody>
      <md-loading *ngIf="loading"></md-loading>
      <span [ngStyle]="{ opacity: opacity }">
        <ng-content></ng-content>
      </span>
    </div>
  `,
})
export class ButtonComponent
  implements OnInit, AfterViewInit, OnChanges, AfterContentInit {
  /** @option Active Sets button to active | false */
  @Input() public active: boolean = false;
  /** @option AriaLabel Text to display for blindness accessibility features | '' */
  /** @option AriaLabelledBy ID to reference for blindness accessibility feature | '' */
  /** @option Creates a circle shaped button | false */
  @Input() public circle: boolean = false;
  /** @option Optional css class string | '' */
  @Input() public class: string = '';
  /** @option Sets optional button color | '' */
  @Input() public color: string = '';
  /** @option Sets the attribute disabled to Button | false */
  @Input() public disabled: boolean = false;
  /** @option Sets expand css styling to widen the Button | false */
  @Input() public expand: boolean = false;
  /** @option Sets href for an anchor tagged button | '' */
  @Input() public href: string = '';
  /** @option Activates the loading animation and sets the button to disabled | false */
  @Input() public loading: boolean = false;
  /** @option Boolean to remove Button's default style | false */
  @Input() public removeStyle: boolean = false;
  /** @option Size value | '36' */
  @Input() public size: string = '36';
  /** @option Html button type | 'button' */
  @Input() public type: string = 'button';

  @ViewChild('divBody') element: ElementRef;
  @ViewChild('loader') loaderChild: ElementRef;

  @HostBinding('attr.width') public width;
  @HostBinding('attr.alt') alt;
  @HostBinding('attr.active') get activeOption() {
    return this.active || null;
  }
  @HostBinding('attr.disabled') get disabledOption() {
    return this.disabled || null;
  }
  @HostBinding('attr.href') get hrefOption() {
    return this.href || null;
  }
  @HostBinding('attr.type') get typeOption() {
    return this.type || 'button';
  }

  @HostBinding('class') get className(): string {
    return (
      'md-button' +
      `${(this.circle && ` md-button--circle`) || ''}` +
      `${(this.removeStyle && ' md-button--none') || ''}` +
      `${(this.getSize() && ` md-button--${this.getSize()}`) || ''}` +
      `${(this.getColor() && ` md-button--${this.getColor()}`) || ''}` +
      `${(this.expand && ` md-button--expand`) || ''}` +
      `${(this.class && ` ${this.class}`) || ''}` +
      `${(this.disabled && ` md-button--disabled`) || ''}` +
      `${(this.active && !this.disabled && ` active`) || ''}` +
      ``
    );
  }

  public initWidth: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.disabled = this.disabled || this.loading || null;
  }

  ngAfterViewInit() {
    this.initWidth = `${this.element.nativeElement.offsetWidth + 0.001}px`;

    if (
      this.type &&
      this.type !== 'button' &&
      this.type !== 'reset' &&
      this.type !== 'submit'
    ) {
      throw new Error(
        'md-button: Button type must be one of the following: button, reset, submit'
      );
    }
  }

  ngAfterContentInit() {
    setTimeout(() => this.setAriaLabel(), 100);
  }

  ngOnChanges(changes) {
    if (changes.loading && changes.loading.currentValue) {
      this.width = this.initWidth;
    } else {
      this.width = '';
    }
  }

  public get opacity(): number {
    return this.loading ? 0 : 1;
  }

  private getColor = () => {
    if (this.removeStyle) {
      return false;
    }
    return this.color === 'none' ? 'color-none' : this.color;
  }

  private getSize = () => {
    if (this.removeStyle) {
      return false;
    }
    const validButtonSize = this.checkButtonSize();

    if (!this.circle && !validButtonSize) {
      console.warn(
        `[@momentum-ui/angular] Button: selected size is not supported
         for non-circular button. Size will default to 36`
      );

      return '36';
    } else {
      return this.size === 'none' ? 'size-none' : this.size;
    }
  }

  private checkButtonSize = () =>
    ['none', '28', '36', '40', '52', 28, 36, 40, 52].includes(this.size)

  private setAriaLabel() {
    let ariaLabel = this.getAttr('aria-label');
    if (!ariaLabel) {
      if (this.element.nativeElement.children.length > 0) {
        throw new Error(
          'md-button: content is not a string, you must add an "ariaLabel" for accessibility.'
        );
      } else {
        ariaLabel = this.element.nativeElement.innerText;
      }
    }
  }

  private getAttr(attr) {
    return this.el.nativeElement.getAttribute(attr);
  }
}
