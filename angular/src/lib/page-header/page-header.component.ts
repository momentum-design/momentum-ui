import { Component, OnInit, Input, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { PageHeaderContentComponent } from './page-header-content.component';

export type tweenType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';

@Component({
  selector: 'md-page-header',
  template: `
    <md-page-header-content #staticElement [title]='title' [lead]='lead'></md-page-header-content>
    <md-page-header-content *ngIf='enableScrollFix' #fixElement [title]='title' [lead]='lead' [ifFixed]='true'></md-page-header-content>
  `,
  styles: [
    ':host{grid-area: page-header; display:block;}'
  ],
  host: {
    class: 'md-page-header',
    '[class.md-page-header--left]': 'textAlign'
  }
})
export class PageHeaderComponent implements OnInit {
  /** @prop Text to display for title features | '' */
  @Input() title: string = '';
  /** @prop Text to display for descriptions features | '' */
  @Input() lead: string = '';
  /** @prop Sets css style (text-align) for the component | 'center' */
  @Input() textAlign: string = 'center';
  /** @prop Sets whether to fix component when scrolling | true */
  @Input() enableScrollFix: boolean = false;
  /** @prop shrink motion will be called when the scrollTop of the container is bigger than this value | 0 */
  @Input() shrinkStartScrollTop: number = 0;
  /** @prop Sets the css top value which  the component will be fixed at finally | 20 */
  @Input() shrinkEndFixedTop: number = 20;
  /** @prop Sets the range which the leader hiding motion will be called | 20 */
  @Input() leaderHideLength: number = 20;
  /** @prop Sets the css transform:scale(X) for the fixed state | 0.42 */
  @Input() ratioMin: number = 1;
  /** @prop Sets the easing formula for the shrinking motion | 'linear' */
  @Input() tween: tweenType = 'linear';

  @ViewChild('fixElement') fixElement?: PageHeaderContentComponent;
  @ViewChild('staticElement') staticElement: PageHeaderContentComponent;

  private checkDomTime = 0;
  private scrollState = 0; // 0 top 1 shrinking 2 fixed on the top
  private warpX = 0;
  private warpY = 0;
  private warpH = 0;
  private shrinkEndScrollTop = 0;
  private shrinkLength = 0;
  private leaderShrinkStartScrollTop = 0;

  private Tween = {
    linear: function (t, b, c, d) {
      return c * t / d + b;
    },
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    }
  };

  public ifContainerClassLeft = true;

  constructor(
    private eventManager: EventManager,
    private viewContainerRef: ViewContainerRef
  ) {

  }

  ngOnInit() {
    this.ifContainerClassLeft = this.textAlign === 'center';
    if (this.enableScrollFix) {
      this.eventManager.addGlobalEventListener('window', 'scroll', (e) => {
        this.onScroll();
      });
    }
  }

  onScroll = () => {
    this.checkDom();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (scrollTop <= this.shrinkStartScrollTop) {
      this.checkScrollState(0, () => {
        this.fixElement.setWarpFixedState(this.warpX, this.warpY, 1, 1);
      });
    } else if (scrollTop <= this.shrinkEndScrollTop) {
      this.checkScrollState(1);
      const _t = scrollTop - this.shrinkStartScrollTop,
        _top = this.Tween.linear(_t, this.warpY, this.shrinkEndFixedTop - this.warpY, this.shrinkLength),
        _scale = this.Tween[this.tween](_t, 1, this.ratioMin - 1, this.shrinkLength);
      let _leadOpacity = 1;
      if (_t >= this.leaderShrinkStartScrollTop) {
        _leadOpacity = this.Tween[this.tween](_t - this.leaderShrinkStartScrollTop, 1, -1, this.shrinkLength - this.shrinkStartScrollTop);
      }
      this.fixElement.setWarpFixedState(this.warpX, Math.floor(_top), _scale, _leadOpacity);
    } else {
      this.checkScrollState(2, () => {
        this.fixElement.setWarpFixedState(this.warpX, this.shrinkEndFixedTop, this.ratioMin, 0);
      });
    }
  }

  checkDom = () => {
    if (this.checkDomTime < 2) {
      const warp = this.viewContainerRef.element.nativeElement,
        pos = this.getDomPosition(warp);
      this.warpX = pos.x;
      this.warpY = pos.y;
      this.warpH = warp.clientHeight;
      this.checkDomTime++;
      const plusScroll = Math.floor(this.warpH * (1 - this.ratioMin));
      this.shrinkLength = this.warpY - this.shrinkEndFixedTop + plusScroll;
      if (this.leaderHideLength < this.shrinkLength) {
        this.leaderShrinkStartScrollTop = this.shrinkStartScrollTop + this.shrinkLength - this.leaderHideLength;
      } else {
        this.leaderShrinkStartScrollTop = Math.floor(this.shrinkStartScrollTop + this.shrinkLength / 4 * 3);
      }
      this.shrinkEndScrollTop = this.shrinkStartScrollTop + this.shrinkLength;
    }
  }

  // 0 top 1 shrinking 2 fixed on the top
  checkScrollState = (scrollState, callback?) => {
    if (scrollState !== this.scrollState) {
      this.scrollState = scrollState;
      this.fixElement.setVisibility(scrollState);
      this.staticElement.setVisibility(scrollState);
      if (callback !== undefined) {
        callback();
      }
    }
  }

  getDomPosition = pObj => {
    let _left = pObj.offsetLeft || 0,
      _top = pObj.offsetTop || 0;
    while (pObj === pObj.offsetParent) {
      _left += pObj.offsetLeft;
      _top += pObj.offsetTop;
    }
    return { x: _left, y: _top };
  }

}
