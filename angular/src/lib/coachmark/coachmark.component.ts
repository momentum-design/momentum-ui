import {
  Component, Input,
  ElementRef, ViewChild, AfterContentInit, TemplateRef,
  ContentChild, AfterViewInit, ViewContainerRef, Output, EventEmitter
} from '@angular/core';
import { CoachmarkService } from './coachmark.service';
import {
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayRef,
  HorizontalConnectionPos,
  VerticalConnectionPos
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

export declare type ArrowPositionType = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'md-coachmark',
  template: `
  <ng-template #tempCoachmark>
    <div class='md-event-overlay__arrow'></div>
    <div class='md-event-overlay__children' (click)='handleClick($event)'>
      <div class='md-coachmark__container'>
        <div class='md-coachmark__header'>
          <ng-content select='[coachmark_header]'></ng-content>
        </div>
        <div class='md-coachmark__subheader'>
          <ng-content select='[coahmark_subheader]'></ng-content>
        </div>
        <ng-content></ng-content>
      </div>
    </div>
  </ng-template>
  `,
  styles: [
    '.md-event-overlay__arrow{position:absolute;}',
    '.md-event-overlay__children{position:static;box-shadow: inset 0 0 0 1px #D2D5D6, 0 4px 12px 0 rgba(0, 0, 0, 0.16) !important;}'
  ],
  providers: [CoachmarkService]
})

export class CoachmarkComponent implements AfterContentInit, AfterViewInit {
  /** @prop the element which is used to set coachmark's position | '' */
  @Input() archor: any;
  /** @prop Allows user to click outside of element | false */
  @Input() allowClickAway: boolean = false;
  /** @prop Optional css class string | '' */
  @Input() className: string = '';
  /** @prop Allows Coachmark to be closed by a click from the user | false */
  @Input() closeOnClick: boolean = false;
  /** @prop Sets the time the timer is delayed | 0 */
  @Input() delay: number = 0;
  /** @prop Sets the time delay to hide the Coachmark | 0 */
  @Input() hideDelay: number = 0;
  /** @prop Sets the initial visibility of Coachmark | false */
  @Input() isOpen: boolean = false;
  /** @prop Sets the maximum width of Coachmark | null */
  @Input() maxWidth?: number | string;
  /** @prop Sets the minimum width of Coachmark | null */
  @Input() minWidth?: number | string;
  /** @prop Sets the maxHeight height of Coachmark | null */
  @Input() maxHeight?: number | string;
  /** @prop Sets the minHeight height of Coachmark | null */
  @Input() minHeight?: number | string;
  /** @prop Sets the width of Coachmark | null */
  @Input() width?: number | string;
  /** @prop Sets the height of Coachmark | null */
  @Input() height?: number | string;
  /** @prop Shows visibility of the delay value | 0 */
  @Input() showDelay: number;
  /** @prop Optional overlay positioin | '' */
  @Input() public originX: HorizontalConnectionPos = 'start';
  /** @prop Optional overlay positioin | '' */
  @Input() public originY: VerticalConnectionPos = 'bottom';
  /** @prop Optional overlay positioin | '' */
  @Input() public overlayX: HorizontalConnectionPos = 'start';
  /** @prop Optional overlay positioin | '' */
  @Input() public overlayY: VerticalConnectionPos = 'top';
  /** @prop Optional set the positon of the arrow | '' */
  @Input() public arrowPosition: ArrowPositionType;
  /** @prop Optional set the offset of the arrow | '' */
  @Input() public arrowOffset: number;
  /** @prop Handler to be called when the user clicks the Coachmark | null */
  @Output() public whenClick = new EventEmitter();
  /** @prop Handler to be called when Coachmark is closed, should be provided when allowClickAway is true | null */
  @Output() public whenClose = new EventEmitter();

  @ViewChild('tempCoachmark') tempCoachmark: TemplateRef<any>;
  @ContentChild('coachmark_close') coachmark_close: ElementRef;

  private showTimerId: any;
  private hideTimerId: any;
  private overlayRef: OverlayRef;
  private tp: TemplatePortal;
  private positionHash = {
    'start': 0,
    'top': 0,
    'center': 1,
    'end': 2,
    'bottom': 2
  };
  private classArray = ['top', 'bottom', 'left', 'right'];
  private ArrowPositionClass;

  constructor(
    private coachmarkService: CoachmarkService,
    private overlay: Overlay,
    private overlayContainer: OverlayContainer,
    public viewContainerRef: ViewContainerRef
  ) { }

  ngAfterContentInit() {
    if (this.coachmark_close && this.coachmark_close.nativeElement) {
      this.coachmark_close.nativeElement.addEventListener('click', () => {
        this.delayedHide();
      });
    }
  }

  ngAfterViewInit() {
    this.initOverlayer();
    if (!this.allowClickAway && this.closeOnClick) {
      this.overlayRef.backdropClick().subscribe(() => {
        this.dismissContent();
      });
    }

    this.overlayRef.detachments().subscribe(() => {
      this.whenClose.emit();
    });

    if (this.isOpen) {
      this.delayedShow();
    }
  }

  private initOverlayer = () => {
    this.checkArrowName();
    const strategy = this.overlay
      .position()
      .flexibleConnectedTo(this.archor)
      .withPositions([
        {
          offsetX: this.ArrowPositionClass === 'left' ? -14 : 0,
          offsetY: this.ArrowPositionClass === 'top' ? -14 : 0,
          originX: this.originX,
          originY: this.originY,
          overlayX: this.overlayX,
          overlayY: this.overlayY,
        }
      ]);
    const arrowClass = 'md-event-overlay--' + this.ArrowPositionClass;
    const panelClass = [
      'md-event-overlay',
      'md-event-overlay--arrow',
      arrowClass,
      'md-coachmark'
    ];
    if (!!this.className) {
      panelClass.push(this.className);
    }
    const config = new OverlayConfig({
      hasBackdrop: !this.allowClickAway,
      panelClass: panelClass,
      positionStrategy: strategy,
      width: this.width,
      height: this.height,
      maxWidth: this.maxWidth,
      minWidth: this.minWidth,
      maxHeight: this.maxHeight,
      minHeight: this.minHeight
    });
    strategy.positionChanges.subscribe(() => {
      this.checkDom();
      this.setArrowPosition();
    });
    this.overlayRef = this.overlay.create(config);
    this.tp = new TemplatePortal(this.tempCoachmark, this.viewContainerRef);
    this.coachmarkService.showed$.subscribe(isShow => {
      if (isShow) {
        this.showContent();
      } else {
        this.dismissContent();
      }
    });
  }

  private position = (pObj) => {
    let _left = pObj.offsetLeft || 0,
      _top = pObj.offsetTop || 0;
    const w = pObj.offsetWidth,
      h = pObj.offsetHeight;
    while (pObj = pObj.offsetParent) {
      _left += pObj.offsetLeft;
      _top += pObj.offsetTop;
    }
    return {
      x: _left,
      y: _top,
      w: w,
      h: h
    };
  }
  /**
   * get the offset of the arrow
   * @param cl the left / top of the pop over
   * @param cw the witdh / height of the pop over
   * @param al the left / top of arrow
   * @param aw the witdh / height of arrow
   */
  private setArrowHelp = (cl, cw, al, aw) => {
    let point;
    const adjustLength = 15,
      max = cl + cw - adjustLength,
      min = cl + adjustLength;
    if (cw > aw) {
      point = Math.floor(al + aw / 2);
      if (point < min) {
        point = min;
      } else if (point > max) {
        point = max;
      }
    } else {
      point = Math.floor(cl + cw / 2);
    }
    return point;
  }

  private setArrowPosition = () => {

    const con = this.overlayContainer.getContainerElement(),
      child = con.querySelector('.md-event-overlay__children'),
      arrow = con.querySelector('.md-event-overlay__arrow');

    const cpos = this.position(child),
      apos = this.position(this.archor);

    let l = 0,
      t = 0;

    if (this.ArrowPositionClass === 'top' || this.ArrowPositionClass === 'bottom') {
      if (this.ArrowPositionClass === 'top') {
        t = cpos.h;
      }
      l = this.arrowOffset != null ?
        this.arrowOffset :
        this.setArrowHelp(cpos.x, cpos.w, apos.x, apos.w) - cpos.x;
    } else {
      if (this.ArrowPositionClass === 'left') {
        l = cpos.w;
      }
      t = this.arrowOffset != null ?
        this.arrowOffset :
        this.setArrowHelp(cpos.y, cpos.h, apos.y, apos.h) - cpos.y;
    }

    switch (this.ArrowPositionClass) {
      case 'top':
        t = cpos.h;
        break;
      case 'bottom':
        break;
      case 'right':
        break;
      case 'left':
        l = cpos.w;
        break;
    }
    arrow.setAttribute('style', 'transform:translate(' + l + 'px,' + t + 'px)');
  }
  /**
   * get the weighted value of the direction
   */
  private checkArrowHelp = (origin, overlay) => {
    const originV = this.positionHash[origin],
      overlayV = this.positionHash[overlay];
    let pos = -1,
      score = 0;
    if (originV !== 1) {
      pos = (originV) / 2;
      score = 20 + Math.abs(originV - overlayV) * 10;

    } else if (overlayV !== 1) {
      pos = (2 - originV) / 2;
      score = 10;
    }
    return {
      pos,
      score
    };
  }

  /**
   * get the direction of the arrow
   */
  private checkArrowName = () => {
    if (this.arrowPosition !== undefined) {
      this.ArrowPositionClass = this.arrowPosition;
    } else {
      const positionPoint = [4, 2, 3, 1]; // Weighted value of [ top, bottom, left, right ]
      const yPlus = this.checkArrowHelp(this.originY, this.overlayY),
        xPlus = this.checkArrowHelp(this.originX, this.overlayX);
      positionPoint[yPlus.pos] += yPlus.score;
      positionPoint[xPlus.pos + 2] += xPlus.score;
      this.ArrowPositionClass = this.classArray[positionPoint.indexOf(Math.max.apply(null, positionPoint))];
    }

  }
  /**
   * Remove the container of head and subhead if no content
   */
  private checkDom = () => {
    const container = this.overlayContainer.getContainerElement(),
      header = container.querySelector('.md-coachmark__header'),
      subheader = container.querySelector('.md-coachmark__subheader');
    this.checkEmpty(header);
    this.checkEmpty(subheader);
  }

  private checkEmpty = (dom) => {
    if (dom.childNodes.length < 1) {
      dom.parentNode.removeChild(dom);
    }
  }

  private showContent = () => {
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.tp);
    }
  }

  private dismissContent = () => {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      if (this.overlayRef.backdropElement) {
        this.overlayRef.backdropElement.remove();
      }
    }
  }

  handleClick = (e) => {
    this.whenClick.emit(e);
  }

  show = () => {
    this.coachmarkService.setVisiable(true);
  }

  dismiss = () => {
    this.coachmarkService.setVisiable(false);
  }

  delayedShow = () => {
    if (this.showTimerId) {
      clearTimeout(this.showTimerId);
      this.showTimerId = null;
    }
    const delay = this.showDelay ? this.showDelay : this.delay;
    this.showTimerId = setTimeout(() => {
      this.show();
    }, delay);
  }

  delayedHide = () => {
    if (this.hideTimerId) {
      clearTimeout(this.hideTimerId);
      this.hideTimerId = null;
    }
    const delay = this.hideDelay ? this.hideDelay : this.delay;
    this.hideTimerId = setTimeout(() => {
      this.dismiss();
    }, delay);
  }

}
