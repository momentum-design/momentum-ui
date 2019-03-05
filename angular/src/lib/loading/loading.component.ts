import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'cui-loading, CSLoading',
  template: `
    <div class="cui-loading" #loader>
      <span class="cui-loading__icon"></span>
      <span class="cui-loading__icon"></span>
      <span class="cui-loading__icon"></span>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class LoadingComponent {
  constructor() {}
}

 /**
 * @component loading
 * @section default
 * @angular
 *
<div className="row">
  <div className="docs-example docs-example--spacing" [style]="{fontSize: '1rem', display: 'flex'}">
    <cui-loading></cui-loading>
  </div>
  <div className="docs-example docs-example--spacing" [style]="{fontSize: '2rem', display: 'flex'}">
    <cui-loading></cui-loading>
  </div>
  <div className="docs-example docs-example--spacing" [style]="{fontSize: '3rem', display: 'flex'}">
    <cui-loading></cui-loading>
  </div>
</div>
 */
