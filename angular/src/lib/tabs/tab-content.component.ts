import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'cui-tab-content',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
})
export class TabContentComponent implements OnInit {
  @HostBinding('class') get className(): string {
    return 'cui-tab__content';
  }

  constructor() {}

  ngOnInit() {}
}
