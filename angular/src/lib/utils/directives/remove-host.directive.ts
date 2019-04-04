import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[cuiRemoveHost]'
})
export class RemoveHostDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
      const nativeElement: HTMLElement = this.el.nativeElement,
          parentElement: HTMLElement = nativeElement.parentElement;

      // move all children out of the element
      while (nativeElement.firstChild) {
          parentElement.insertBefore(nativeElement.firstChild, nativeElement);
      }

      // remove the empty element(the host)
      parentElement.removeChild(nativeElement);
  }
}
