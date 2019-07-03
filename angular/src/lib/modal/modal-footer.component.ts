/** @component modal-footer */

import { Component,  Input, HostBinding } from '@angular/core';

@Component({
  selector: 'md-modal-footer',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
})
export class ModalFooterComponent  {
  /** @prop css class names | '' | '' */
  @Input() public class: string = '';

  @HostBinding('class') get className(): string {
    return (
      'md-modal__footer' + `${(this.class && ` ${this.class}`) || ''}` + ``
    );
  }
}
