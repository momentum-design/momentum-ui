import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'md-tab-content',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
})
export class TabContentComponent implements OnInit {
  @HostBinding('class') get className(): string {
    return 'md-tab__content';
  }

  constructor() {}

  ngOnInit() {}
}
