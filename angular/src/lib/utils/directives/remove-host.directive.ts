import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[mdRemoveHost]'
})
export class RemoveHostDirective implements OnInit {
  constructor(private _element: ElementRef) {}

  ngOnInit() {
      const nativeElement: HTMLElement = this._element.nativeElement;
      const parentElement: HTMLElement = nativeElement.parentElement;

      // move all children out of the host element
      while (nativeElement.firstChild) {
        parentElement.insertBefore(nativeElement.firstChild, nativeElement);
      }

      // remove the empty host element
      parentElement.removeChild(nativeElement);
  }
}
