/** @component form */

import { Component, Input } from '@angular/core';

/**
 * FormInfo is supplemental, organizational component used to help divide form
 **/

@Component({
  selector: 'md-form-info',
  template: `
    <h4 class="section__title">{{ title }}</h4>
    <p *ngIf="description" class="section__description">{{ description }}</p>
  `,
  host: {
    'class': 'section__info',
  }
})

export class FormInfoComponent {
  /** @prop Optional FormInfo description text | '' */
  @Input() description: string = '';
  /** @prop Optional FormInfo title | '' */
  @Input() title: string = '';
}
