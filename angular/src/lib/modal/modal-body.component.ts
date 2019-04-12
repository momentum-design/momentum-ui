/** @component modal-body */

import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'md-modal-body',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
})
export class ModalBodyComponent implements OnInit {
  /** @option css class names | '' | '' */
  @Input() public class: string = '';

  @HostBinding('class') get className(): string {
    return 'md-modal__body' + `${(this.class && ` ${this.class}`) || ''}` + ``;
  }

  constructor() { }

  ngOnInit() { }
}
