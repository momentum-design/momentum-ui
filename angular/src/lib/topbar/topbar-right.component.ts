import { Component } from '@angular/core';

@Component({
  selector: 'md-top-bar-right',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'md-top-bar__right',
  },
})
export class TopbarRightComponent {}
