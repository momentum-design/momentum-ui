import { Component, OnInit, Input, HostBinding } from '@angular/core';


@Component({
  selector: 'cui-modal-footer',
  template: `
      <ng-content></ng-content>
  `,
  styles: []
})
export class ModalFooterComponent implements OnInit {

  /** @option css class names | '' | '' */
  @Input() public class: string = '';

  @HostBinding('class') get className(): string {
    return 'cui-modal__footer' +
    `${(this.class && ` ${this.class}`) || ''}` +
    ``;
  }

  constructor() { }

  ngOnInit() {}

}

/**
 * @component modal-footer
 * @section class
 * @angular
 *
<cui-modal>
  <cui-modal-footer class='large'></cui-modal-footer>
</cui-modal>
 */

/**
 * @component modal-footer
 * @section ng-content
 * @angular
 *
<cui-modal>
  <cui-modal-footer class='large'>
    <a>close</a>
  </cui-modal-footer>
</cui-modal>
 */

