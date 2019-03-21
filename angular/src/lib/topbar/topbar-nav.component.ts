import { Component } from '@angular/core';

@Component({
  selector: 'cui-top-bar-nav',
  template: `
    <cui-list tabType="horizontal">
      <ng-content></ng-content>
    </cui-list>
  `,
  host: {
    'class': 'cui-top-bar__nav'
  },
})
export class TopbarNavComponent { }
