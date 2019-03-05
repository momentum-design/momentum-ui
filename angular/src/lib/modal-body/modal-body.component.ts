import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'cui-modal-body',
  template: `
    <ng-content></ng-content>
  `,
  styles: []
})
export class ModalBodyComponent implements OnInit {

  /** @option css class names | '' | '' */
  @Input() public class: string = '';

  @HostBinding('class') get className(): string {
    return 'cui-modal__body' +
    `${(this.class && ` ${this.class}`) || ''}` +
    ``;
  }

  constructor() { }

  ngOnInit() {}

}

/**
 * @component modal-body
 * @section class
 * @angular
 *
<cui-modal>
  <cui-modal-body class='large'></cui-modal-body>
</cui-modal>
 */

/**
 * @component modal-body
 * @section ng-content
 * @angular
 *
<cui-modal>
  <cui-modal-body class='large'>
    <p>MyBody Dom...</p>
  </cui-modal-body>
</cui-modal>
 */
