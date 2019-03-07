import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'cui-loading, CSLoading',
  template: `
    <span class="cui-loading__icon"></span>
    <span class="cui-loading__icon"></span>
    <span class="cui-loading__icon"></span>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class LoadingComponent {
  /** @prop Prop to make the Loading animation small | false */
  @Input() private small: boolean = false;

  @HostBinding('class') get className(): string {
    return `cui-loading ${this.small ? 'cui-loading--small' : ''}`;
  }

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
