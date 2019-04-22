/** @component loading */

import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'md-loading, CSLoading',
  template: `
    <span class="md-loading__icon"></span>
    <span class="md-loading__icon"></span>
    <span class="md-loading__icon"></span>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class LoadingComponent {
  /** @option Prop to make the Loading animation small | false */
  @Input() private small: boolean = false;

  @HostBinding('class') get className(): string {
    return `md-loading ${this.small ? 'md-loading--small' : ''}`;
  }

  constructor() {}
}
