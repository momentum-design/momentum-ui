/** @component loading */

import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
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
  /** @option Prop to make the Loading animation small | false */
  @Input() private small: boolean = false;

  @HostBinding('class') get className(): string {
    return `cui-loading ${this.small ? 'cui-loading--small' : ''}`;
  }

  constructor() {}
}
