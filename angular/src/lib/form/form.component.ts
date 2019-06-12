/** @component form */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'md-form',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    'class': 'md-form',
    '[attr.name]': 'name',
  }
})

export class FormComponent {
  /** @prop Form name */
  @Input() name: string;
}
