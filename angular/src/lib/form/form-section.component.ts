/** @component form */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'md-form-section',
  template: `
    <md-form-info [title]="title" [description]="description"></md-form-info>
    <md-form-content><ng-content></ng-content></md-form-content>
  `,
  host: {
    'class': 'md-form__section',
  }
})

export class FormSectionComponent {
  /** @prop Optional FormSection description | '' */
  @Input() description: string = '';
  /** @prop Optional FormSection title | null */
  @Input() title: string;
}
