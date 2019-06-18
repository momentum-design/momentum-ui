/** @component form */

import { Component, Input } from '@angular/core';

/**
 * FormContent helps organize the content within a form section and provides a S wrapper;
 **/

@Component({
  selector: 'md-form-content',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    'class': 'section__content',
  }
})

export class FormContentComponent {}
