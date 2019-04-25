import { Component, Input, ChangeDetectionStrategy, TemplateRef, ElementRef} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'md-popover-container',
  styles: [],
  template: `
  <div class="md-popover md-event-overlay md-event-overlay--arrow">
    <div class="md-event-overlay__arrow" ></div>
    <div  class="md-event-overlay__children">
        <md-popover text={{this.text}} [popoverTemplate]="popoverTemplate"></md-popover>
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
    this.elementRef.nativeElement.children[0].classList.add(`md-event-overlay--${direction}`);
    this._direction = direction;
  }

  private _showArrow: string;
  /** @prop Sets whether or not to show the arrow on the popover  */
  @Input()
  set showArrow(showArrow: string) {
    if ( showArrow === 'false' ) {
      this.elementRef.nativeElement.children[0].classList.remove(
        `md-event-overlay--arrow`
      );
      this.elementRef.nativeElement.children[0].children[0].classList.remove(
        `md-event-overlay__arrow`
      );
    }
    this._showArrow = showArrow;
  }


    constructor(private elementRef: ElementRef) {}
}
