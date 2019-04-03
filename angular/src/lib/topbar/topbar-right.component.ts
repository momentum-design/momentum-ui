import { Component } from '@angular/core';

@Component({
  selector: 'cui-top-bar-right',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'cui-top-bar__right',
  },
})
export class TopbarRightComponent {}
