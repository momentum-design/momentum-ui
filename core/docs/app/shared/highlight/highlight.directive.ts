import { AfterViewInit, Directive, ElementRef } from '@angular/core';

declare var hljs: any;

@Directive({
  selector: 'code[highlight]'
})
export class HighlightDirective {
  constructor(private eltRef: ElementRef) {
  }

  ngAfterViewInit() {
    hljs.highlightBlock(this.eltRef.nativeElement);
  }
}
