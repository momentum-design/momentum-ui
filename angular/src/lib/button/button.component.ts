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
  selector: 'button[cui-button], a[cui-button], input[cui-button]',
  exportAs: 'cuiButton',
  template: `
    <div #divBody>
      <cui-loading *ngIf="loading"></cui-loading>
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
      'cui-button' +
      `${(this.circle && ` cui-button--circle`) || ''}` +
      `${(this.removeStyle && ' cui-button--none') || ''}` +
      `${(this.getSize() && ` cui-button--${this.getSize()}`) || ''}` +
      `${(this.getColor() && ` cui-button--${this.getColor()}`) || ''}` +
      `${(this.expand && ` cui-button--expand`) || ''}` +
      `${(this.class && ` ${this.class}`) || ''}` +
      `${(this.disabled && ` cui-button--disabled`) || ''}` +
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
        'cui-button: Button type must be one of the following: button, reset, submit'
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
        `[@collab-ui/angular] Button: selected size is not supported
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
          'cui-button: content is not a string, you must add an "ariaLabel" for accessibility.'
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

/**
* @component button
* @section active
* @angular
*
<div>
  <button cui-button aria-label="myAriaLabel" [active]=true (click)="onClick()">Test Me</button>
  <button cui-button aria-label="myAriaLabel" [active]=false (click)="onClick()">Test Me</button>

  <a cui-button aria-label="myAriaLabel" [active]=true>Test Me</a>
  <a cui-button aria-label="myAriaLabel" [active]=false>Test Me</a>
</div>
*/

/**
 * @component button
 * @section default
 * @angular
 *
<div>
  <button cui-button aria-label="myAriaLabel" (click)="onClick()">Test Me</button>
</div>
 */

/**
 * @component button
 * @section tags
 * @angular
 *
<div>
  <button cui-button aria-label="myAriaLabel" (click)="onClick()">Test Me</button>
  <a cui-button aria-label="myAriaLabel" (click)="onClick()">Test Me</a>
  <input cui-button aria-label="myAriaLabel" (click)="onClick()" />
</div>
 */

/**
 * @component button
 * @section color
 * @angular
 *
<div class='row'>
  <button cui-button aria-label="myAriaLabel" color="blue" (click)="onClick()">Test Me</button>
  <button cui-button aria-label="myAriaLabel" [color]="myColorVariable" (click)="onClick()">Test Me</button>
</div>
 */

/**
 * @component button
 * @section size
 * @angular
 *
<div>
  <button cui-button aria-label="myAriaLabel" size="none" (click)="onClick()">None</button>
  <button cui-button aria-label="myAriaLabel" size="28" (click)="onClick()">size 28</button>
  <button cui-button aria-label="myAriaLabel" size="36" (click)="onClick()">size 36</button>
  <button cui-button aria-label="myAriaLabel" size="40" (click)="onClick()">size 40</button>
  <button cui-button aria-label="myAriaLabel" size="52" (click)="onClick()">size 52</button>
  <button cui-button aria-label="myAriaLabel" [size]="mySizeVariable" (click)="onClick()">sizeVariable</button>

</div>

/**
 * @component button
 * @section circle
 * @angular
 *
<div>
  <button cui-button aria-label="myAriaLabel" [circle]=true (click)="onClick()">C</button>
  <button cui-button aria-label="myAriaLabel" [circle]=false (click)="onClick()">C</button>
  <button cui-button aria-label="myAriaLabel" [circle]="myCircleVariable" (click)="onClick()">Var</button>
</div>
 */

/**
 * @component button
 * @section expanded
 * @angular
 *
<div>
  <button cui-button aria-label="myAriaLabel" [expand]=true (click)="onClick()">Test Me</button>
</div>
 */

/**
 * @component button
 * @section disabled
 * @angular
 *
<div>
  <button cui-button aria-label="myAriaLabel" [disabled]=true (click)="onClick()">Test Me</button>
  <button cui-button aria-label="myAriaLabel" [disabled]=false (click)="onClick()">Test Me</button>

  <a cui-button aria-label="myAriaLabel" [disabled]=true>Test Me</a>
  <a cui-button aria-label="myAriaLabel" [disabled]=false>Test Me</a>
</div>
 */

/**
 * @component button
 * @section loading
 * @angular
 *
<div>
  <button cui-button [attr.aria-label]="myAriaLabelVar" [loading]=true (click)="onClick()">Test me</button>
  <button cui-button aria-label="myAriaLabel" [loading]=false (click)="onClick()">Test me</button>
</div>
*/

/**
 * @component button
 * @section type
 * @angular
 *
<div>
  <button cui-button [attr.aria-label]="myAriaLabelVar" type="button" (click)="onClick()">Test me</button>
  <button cui-button aria-label="myAriaLabel" [type]="myTypeVariable" (click)="onClick()">Test me</button>
</div>
*/
