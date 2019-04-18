import { Component, Input, ChangeDetectionStrategy, TemplateRef, ElementRef} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'cui-popover-container',
  styles: [],
  template: `
  <div class="cui-popover cui-event-overlay cui-event-overlay--arrow">
    <div class="cui-event-overlay__arrow" ></div>
    <div  class="cui-event-overlay__children">
        <cui-popover text={{this.text}} [popoverTemplate]="popoverTemplate"></cui-popover>
    </div>
  </div>
  `
})
export class PopoverContainerComponent {
  /** @prop Sets text in the popover */
  @Input() text: string;
   /** @prop Sets a component in the popover */
  @Input() popoverTemplate?: TemplateRef<any>;

  private _direction: string = null;
  /** @prop Sets direction of the popover | null */
  @Input()
  set direction(direction: string) {
    this.elementRef.nativeElement.children[0].classList.add(`cui-event-overlay--${direction}`);
    this._direction = direction;
  }

  private _showArrow: string;
  /** @prop Sets whether or not to show the arrow on the popover  */
  @Input()
  set showArrow(showArrow: string) {
    if ( showArrow === 'false' ) {
      this.elementRef.nativeElement.children[0].classList.remove(
        `cui-event-overlay--arrow`
      );
      this.elementRef.nativeElement.children[0].children[0].classList.remove(
        `cui-event-overlay__arrow`
      );
    }
    this._showArrow = showArrow;
  }


    constructor(private elementRef: ElementRef) {}
}
