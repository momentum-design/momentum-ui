import { Component, AfterContentInit, ViewContainerRef, OnInit } from '@angular/core';

@Component({
  selector: 'md-breadcrumbs',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'md-breadcrumbs'
  }
})
export class BreadcrumbsComponent implements OnInit, AfterContentInit {

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() { }

  ngAfterContentInit() {
    const list = this.viewContainerRef.element.nativeElement.getElementsByTagName('LI'),
      len = list.length;
    if (len > 0) {
      list[len - 1].className += ' current';
    }
  }

}
