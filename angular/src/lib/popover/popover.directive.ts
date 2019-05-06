import { Directive, ElementRef,  Input, TemplateRef } from '@angular/core';
import { Overlay, OverlayPositionBuilder,  ScrollStrategyOptions } from '@angular/cdk/overlay';

import { TooltipDirective } from '../tooltip/tooltip.directive';

@Directive({ selector: '[mdPopover]' })
export class PopoverDirective extends TooltipDirective {

  /** @prop Sets content in the popover can be a string or a template */
  @Input('mdPopover') content: string | TemplateRef<any>;

  /** @prop shows the arrow or not */
  @Input() showArrow: boolean  = true;

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
