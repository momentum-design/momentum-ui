import { Component, OnInit, Input, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'md-page-header-content',
  template: `
  <div class="md-page-header__title">{{title}}</div>
  <h4 #leadRef class="md-page-header__lead">{{lead}}</h4>
  `,
  styles: [
    ':host{transform-origin: 0 0; z-index: 1100; margin: 0 auto 3rem 1.5rem;display:block;}',
    '.md-page-header__title{font-size: 2.25rem; line-height: 3rem;}',
    '.md-page-header__lead{ margin-top: .75rem; }'
  ],
  host: {
    class: 'md-page-header__container'
  }
})

export class PageHeaderContentComponent implements OnInit {
  /** @prop Text to display for title features | '' */
  @Input() title: string = '';
  /** @prop Text to display for descriptions features | '' */
  @Input() lead: string = '';
  /** @prop define if the component if fixed dom | false */
  @Input() ifFixed: boolean = false;

  @ViewChild('leadRef') leadRef: ElementRef;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit() {
    if (this.ifFixed) {
      const con = this.viewContainerRef.element.nativeElement;
      con.style.position = 'fixed';
      con.style.zIndex = 1200;
      con.style.top = 0;
      con.style.display = 'none';
    }
  }

  setVisibility = (scrollState) => {
    if (this.ifFixed) {
      this.viewContainerRef.element.nativeElement.style.display = scrollState === 0 ? 'none' : '';
    } else {
      this.viewContainerRef.element.nativeElement.style.visibility = scrollState === 0 ? '' : 'hidden';
    }
  }

  setWarpFixedState = (left, top, scale, leadOpacity) => {
    const con = this.viewContainerRef.element.nativeElement;
    con.style.left = left + 'px';
    con.style.top = top + 'px';
    con.style.transform = 'scale(' + scale + ')';
    this.leadRef.nativeElement.style.opacity = leadOpacity;
  }

}
