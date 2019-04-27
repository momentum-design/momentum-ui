import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit, TemplateRef } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { PopoverContainerComponent } from './popover-container.component';

export type popoverDirection = 'right' | 'left' | 'top' | 'bottom';

@Directive({ selector: '[mdPopover]' })
export class PopoverDirective implements OnInit {

  /** @prop Sets content in the popover can be a string or a template */
  @Input('mdPopover') content: string | TemplateRef<any>;

  /** @prop Sets direction of the popover right,left,top, or bottom */
  @Input() direction: popoverDirection = 'right';

  /** @prop shows the arrow or not */
  @Input() showArrow: string = 'true';

  /** @prop Sets delay for before closing the popover */
  @Input() delay: number = 500;

  /** @prop Sets the popover trigger MouseEnter, Click or Focus - MouseEnter is default*/
  @Input() popoverTrigger: string = 'MouseEnter';

  @Input() offset: number = 5;

  private overlayRef: OverlayRef;
  private positions = [];
  private popoverRef: ComponentRef<PopoverContainerComponent>;

  constructor(private overlay: Overlay,
              private overlayPositionBuilder: OverlayPositionBuilder,
              private _sso: ScrollStrategyOptions,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  @HostListener('mouseenter')
  show() {
    if ( this.popoverTrigger === 'MouseEnter') {
      this.showPopover();
    }
  }

  @HostListener('mouseleave')
  hide() {
    if ( this.popoverTrigger === 'MouseEnter') {
      this.closePopover();
    }
  }

  @HostListener('click')
  onClick() {
    if ( this.popoverTrigger === 'Click') {
      this.showPopover();
    }
  }

  @HostListener('document:click', ['$event.target'])
  close(targetElement) {
    if ( this.popoverTrigger === 'Click') {
      const clickedOutside = !this.elementRef.nativeElement.contains(targetElement);
      if (clickedOutside) {
        this.closePopover();
      }
    }
  }

  @HostListener('focus')
  onFocus() {
    if ( this.popoverTrigger === 'Focus') {
      this.showPopover();
    }
  }

  @HostListener('focusout')
  onFocusout() {
    if ( this.popoverTrigger === 'Focus') {
      this.closePopover();
    }
  }

  private showPopover() {
    if ( this.direction === 'right') {
      this.positions = [{
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
        offsetX: this.offset
      }];
    }  else if ( this.direction === 'left') {
      this.positions = [{
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
        offsetX: -this.offset
      }];
    } else if ( this.direction === 'bottom') {
      this.positions = [{
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: -this.offset
      }];
    } else if ( this.direction === 'top') {
      this.positions = [{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: this.offset
      }];
    }
    const strategy = this.overlayPositionBuilder
    .flexibleConnectedTo(this.elementRef)
    .withPositions(this.positions);


  this.overlayRef = this.overlay.create({
    positionStrategy: strategy,
    scrollStrategy: this._sso.close(),
  });
    if ( !this.popoverRef ) {
      this.popoverRef
        = this.overlayRef.attach(new ComponentPortal(PopoverContainerComponent));
        if ( typeof this.content === 'string') {
          this.popoverRef.instance.text = this.content;
        }
        if ( this.content instanceof TemplateRef ) {
          this.popoverRef.instance.popoverTemplate = this.content;
        }
        this.popoverRef.instance.showArrow = this.showArrow;
        this.popoverRef.instance.direction = this.direction;
    }
  }

  private closePopover() {
    if ( this.popoverRef ) {
      setTimeout(() => {
        this.overlayRef.detach();
        this.popoverRef.destroy();
        this.popoverRef = null;
      }, this.delay);
    }
  }
}
