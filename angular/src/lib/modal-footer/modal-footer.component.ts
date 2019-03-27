/** @component modal-footer */

import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'cui-modal-footer',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
})
export class ModalFooterComponent implements OnInit {
  /** @option css class names | '' | '' */
  @Input() public class: string = '';

  @HostBinding('class') get className(): string {
    return (
      'cui-modal__footer' + `${(this.class && ` ${this.class}`) || ''}` + ``
    );
  }

  constructor() {}

  ngOnInit() {}
}
