/** @component form */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'md-form-sub-section',
  template: `
    <h5 *ngIf="label" class="sub-section__label">{{ label }}</h5>
    <p *ngIf="description" class="sub-section__description">{{ description }}</p>
    <ng-content></ng-content>
  `,
  host: {
    'class': 'sub-section',
  }
})

export class FormSubSectionComponent {
  /** @prop Optional FormSubSection description text | '' */
  @Input() description: string = '';
  /** @prop Optional FormSubSection label text | '' */
  @Input() label: string = '';
}
