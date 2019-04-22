import { Component } from '@angular/core';

@Component({
  selector: 'md-top-bar-nav',
  template: `
    <md-list tabType="horizontal">
      <ng-content></ng-content>
    </md-list>
  `,
  host: {
    class: 'md-top-bar__nav',
  },
})
export class TopbarNavComponent {}
