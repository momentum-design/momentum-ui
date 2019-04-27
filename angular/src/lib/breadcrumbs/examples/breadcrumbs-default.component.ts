import { Component } from '@angular/core';

@Component({
  selector: 'example-breadcrumbs-default',
  template: `
    <md-breadcrumbs [ngClass]='"MyClass"'>
      <li href='javascript:void(0)'>Default</li>
      <li href='javascript:void(0)'>Default2</li>
      <li href='javascript:void(0)'>Default3</li>
    </md-breadcrumbs>
  `
})
export class BreadcrumbsDefaultComponent {

  constructor() { }

}
