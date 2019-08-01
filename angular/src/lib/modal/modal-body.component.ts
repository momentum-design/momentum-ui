/** @component modal-body */

import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'md-modal-body',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
})
export class ModalBodyComponent {
  /** @prop css class names | '' | '' */
  @Input() public class: string = '';

  @HostBinding('class') get className(): string {
    return 'md-modal__body' + `${(this.class && ` ${this.class}`) || ''}` + ``;
  }
}
