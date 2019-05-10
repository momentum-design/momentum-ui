/** @component menu-content */

import { Component } from '@angular/core';

@Component({
  selector: 'md-menu-content',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    'class': 'md-menu-content'
  }
})
export class MenuContentComponent {}
