import { Directive, ElementRef,  Input, TemplateRef, HostListener } from '@angular/core';
import { Overlay, OverlayPositionBuilder,  ScrollStrategyOptions } from '@angular/cdk/overlay';

import { TooltipDirective } from '../tooltip/tooltip.directive';

@Directive({ selector: '[mdPopover]' })
export class PopoverDirective extends TooltipDirective {

  /** @prop Sets content in the popover can be a string or a template */
  @Input('mdPopover') content: string | TemplateRef<any>;

  /** @prop shows the arrow or not */
  @Input() showArrow: boolean  = true;

  /** @prop Sets the popover trigger MouseEnter, Click or Focus - Click is default*/
  @Input() popoverTrigger: string = 'Click';

  constructor(
    overlay: Overlay,
    overlayPositionBuilder: OverlayPositionBuilder,
    _sso: ScrollStrategyOptions,
    elementRef: ElementRef
    ) {
        super(
          overlay,
          overlayPositionBuilder,
          _sso,
          elementRef
          );
      }


  @HostListener('mouseenter')
  showPopover() {
    if ( this.popoverTrigger === 'MouseEnter') {
      this.show();
    }
  }

  @HostListener('mouseleave')
  hide() {
    if ( this.popoverTrigger === 'MouseEnter' || this.popoverTrigger === 'Click') {
      this.close();
    }
  }

  @HostListener('click')
  onClick() {
    if ( this.popoverTrigger === 'Click') {
      this.show();
    }
  }

  @HostListener('document:click', ['$event.target'])
  closePopover(targetElement) {
    if ( this.popoverTrigger === 'Click') {
      const clickedOutside = !this.elementRef.nativeElement.contains(targetElement);
      if (clickedOutside) {
        this.close();
      }
    }
  }

  @HostListener('focus')
  onFocus() {
    if ( this.popoverTrigger === 'Focus') {
      this.show();
    }
  }

  @HostListener('focusout')
  onFocusout() {
    if ( this.popoverTrigger === 'Focus') {
      this.close();
    }
  }

  public show() {
    super.show();
    this.tooltipRef.instance.isTooltip = false;
    this.tooltipRef.instance.classList['md-popover'] = true;
    this.tooltipRef.instance.showArrow = this.showArrow;
  }

  public close() {
    super.close();
  }
}
