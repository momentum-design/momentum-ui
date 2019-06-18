import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { TooltipContainerComponent } from './tooltip-container.component';

export type tooltipDirection = 'right' | 'left' | 'top' | 'bottom';

let id = 0;

@Directive({ selector: '[mdTooltip]' })
export class TooltipDirective implements OnInit, OnDestroy {
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
  @Input() offset: number = 0;


  @HostBinding('attr.aria-describedby')
    ariaDescribedby = `md-tooltip-${this.tooltipId}`;

  public overlayRef: OverlayRef;
  public positions = [];
  public tooltipRef: ComponentRef<TooltipContainerComponent>;

  constructor(public overlay: Overlay,
              public overlayPositionBuilder: OverlayPositionBuilder,
              public _sso: ScrollStrategyOptions,
              public elementRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.delay = 0;
    this.close();
  }

  @HostListener('mouseenter')
  showtoolitp() {
    if ( this.tooltipTrigger === 'MouseEnter') {
      this.show();
    }
  }

  @HostListener('mouseleave')
  hide() {
    if ( this.tooltipTrigger === 'MouseEnter' || this.tooltipTrigger === 'Click') {
      this.close();
    }
  }

  @HostListener('click')
  onClick() {
    if ( this.tooltipTrigger === 'Click') {
      this.show();
    }
  }

  @HostListener('document:click', ['$event.target'])
  closeTooltip(targetElement) {
    if ( this.tooltipTrigger === 'Click') {
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
         }];
          break;
       case 'left':
         this.positions = [{
           originX: 'start',
           originY: 'center',
           overlayX: 'end',
           overlayY: 'center',
           offsetX: -this.offset
         }];
          break;
       case 'bottom':
         this.positions = [{
           originX: 'center',
           originY: 'bottom',
           overlayX: 'center',
           overlayY: 'top',
           offsetY: this.offset
         }];
          break;
      case 'top':
         this.positions = [{
           originX: 'center',
           originY: 'top',
           overlayX: 'center',
           overlayY: 'bottom',
           offsetY: -this.offset
         }];
         break;
       }
    const strategy = this.overlayPositionBuilder
    .flexibleConnectedTo(this.elementRef)
    .withPositions(this.positions);


  this.overlayRef = this.overlay.create({
    positionStrategy: strategy,
    scrollStrategy: this._sso.close(),
  });
    if ( !this.tooltipRef ) {
      this.tooltipRef
        = this.overlayRef.attach(new ComponentPortal(TooltipContainerComponent));
        this.tooltipRef.instance.id = 'md-tooltip-' + this.tooltipId;
        if ( typeof this.content === 'string') {
          this.tooltipRef.instance.text = this.content;
        }
        if ( this.content instanceof TemplateRef ) {
          this.tooltipRef.instance.tooltipTemplate = this.content;
        }
        this.tooltipRef.instance.direction = this.direction;
    }
  }

  public close() {
      setTimeout(() => {
        if (this.overlayRef) {
          this.overlayRef.detach();
        }
        if (this.tooltipRef ) {
          this.tooltipRef.destroy();
          this.tooltipRef = null;
        }
      }, this.delay);
  }
}
