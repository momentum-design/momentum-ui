import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  HostBinding,
  Input,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
  ScrollStrategyOptions,
  FlexibleConnectedPositionStrategy
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { TooltipContainerComponent } from './tooltip-container.component';
import { Subscription } from 'rxjs';

export type tooltipDirection = 'right' | 'left' | 'top' | 'bottom';

let id = 0;

@Directive({ selector: '[mdTooltip]' })
export class TooltipDirective implements OnDestroy {
  tooltipId = id++;

  /** @prop Sets content in the tooltip can be a string or a template */
  @Input('mdTooltip') content: string | TemplateRef<any>;

  /** @prop Sets direction of the tooltip right,left,top, or bottom */
  @Input() direction: tooltipDirection = 'top';

  /** @prop Sets delay for before closing the tooltip */
  @Input() delay: number = 500;

  /** @prop Sets the tooltip trigger MouseEnter, Click or Focus - MouseEnter is default*/
  @Input() tooltipTrigger: string = 'MouseEnter';

 /** @prop Sets the offset of the tooltip from the host */
  @Input() offset: number = 5;

  /** @prop Sets the maxwidth of the tooltip */
  @Input() maxWidth: number = 200;

  /** @prop Allows tooltip to stay open until you click outside | false */
  @Input() closeOnClick: boolean = false;

  /** @prop Allows tooltip to stay open when you hover over the tooltip | false  */
  @Input() allowHover: boolean = false;

  @HostBinding('attr.aria-describedby')
    ariaDescribedby = `md-tooltip-${this.tooltipId}`;

  public overlayRef: OverlayRef;
  public positions = [];
  public tooltipRef: ComponentRef<TooltipContainerComponent>;
  public keepTooltipOpen = false;
  public isOnTarget = false;
  private eventSubs: Subscription;

  constructor(public overlay: Overlay,
              public overlayPositionBuilder: OverlayPositionBuilder,
              public _sso: ScrollStrategyOptions,
              public elementRef: ElementRef) {
  }

  ngOnDestroy() {
    this.delay = 0;
    this.isOnTarget = false;
    this.keepTooltipOpen = false;
    this.close();
  }

  @HostListener('mouseenter')
  showtoolitp() {
    if ( this.tooltipTrigger === 'MouseEnter') {
      this.isOnTarget = this.allowHover; // only checks on allowHover is true
      this.show();
    }
  }

  @HostListener('mouseleave')
  hide() {
    this.isOnTarget = false;
    if ( (this.tooltipTrigger === 'MouseEnter' && !this.closeOnClick  && !this.allowHover )  || this.tooltipTrigger === 'Click') {
      this.close();
    } else if ( this.allowHover && !this.keepTooltipOpen ) {
      this.close();
    }
  }
  @HostListener('document:')

  @HostListener('click')
  onClick() {
    if ( this.tooltipTrigger === 'Click') {
      this.show();
    }
  }

  @HostListener('document:click', ['$event.target'])
  closeTooltip(targetElement) {
    if ( this.tooltipTrigger === 'Click' || this.closeOnClick ) {
      const clickedOutside = !this.elementRef.nativeElement.contains(targetElement);
      if (clickedOutside) {
        this.close();
      }
    }
  }

  @HostListener('focus')
  onFocus() {
    if ( this.tooltipTrigger === 'Focus') {
      this.show();
    }
  }

  @HostListener('focusout')
  onFocusout() {
    if ( this.tooltipTrigger === 'Focus') {
      this.close();
    }
  }

  public show() {
    switch (this.direction) {
      case 'right':
         this.positions = [{
           originX: 'end',
           originY: 'center',
           overlayX: 'start',
           overlayY: 'center',
           offsetX: this.offset
         },
         {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -this.offset
         }
        ];
          break;
       case 'left':
         this.positions = [{
           originX: 'start',
           originY: 'center',
           overlayX: 'end',
           overlayY: 'center',
           offsetX: -this.offset
         },
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: this.offset
        }];
          break;
       case 'bottom':
         this.positions = [{
           originX: 'center',
           originY: 'bottom',
           overlayX: 'center',
           overlayY: 'top',
           offsetY: this.offset
         },
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -this.offset
        }];
          break;
      case 'top':
         this.positions = [{
           originX: 'center',
           originY: 'top',
           overlayX: 'center',
           overlayY: 'bottom',
           offsetY: -this.offset
         },
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: this.offset
        }];
         break;
       }
    const strategy = this.overlayPositionBuilder
    .flexibleConnectedTo(this.elementRef)
    .withPositions(this.positions);

  this.overlayRef = this.overlay.create({
    positionStrategy: strategy as FlexibleConnectedPositionStrategy ,
    scrollStrategy: this._sso.close(),
  });

  if ( !this.tooltipRef ) {
    this.tooltipRef
      = this.overlayRef.attach(new ComponentPortal(TooltipContainerComponent));
      this.tooltipRef.instance.id = 'md-tooltip-' + this.tooltipId;
      this.tooltipRef.instance.maxWidth = this.maxWidth;
      if ( typeof this.content === 'string') {
        this.tooltipRef.instance.text = this.content;
      }
      if ( this.content instanceof TemplateRef ) {
        this.tooltipRef.instance.tooltipTemplate = this.content;
      }
      this.tooltipRef.instance.direction = this.direction;
      this.tooltipRef.instance.allowHover = this.allowHover;

      if (this.allowHover) {
        this.eventSubs = new Subscription();
        this.eventSubs.add(this.tooltipRef.instance.mouseLeaveEvent.subscribe(() => {
          this.keepTooltipOpen = false;
          this.close();
        }));
        this.eventSubs.add(this.tooltipRef.instance.mouseEnterEvent.subscribe(keepOpen => {
          if ( keepOpen && this.allowHover ) {
            this.keepTooltipOpen = true;
          }
        }));
      }
    }
  }

  public close() {
    setTimeout(() => {
      if ( !this.keepTooltipOpen && !this.isOnTarget) {
        if (this.overlayRef) {
          this.overlayRef.detach();
        }
        if (this.tooltipRef ) {
          if (this.allowHover) {
            this.eventSubs.unsubscribe();
          }
          this.tooltipRef.destroy();
          this.tooltipRef = null;
        }
      }
    }, this.delay);
  }
}
