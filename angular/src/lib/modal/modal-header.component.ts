/** @component modal-header */

import {
  Component,
  Input,
  HostBinding,
  HostListener,
} from '@angular/core';
import { ModalRef } from './modal-ref';


@Component({
  selector: 'md-modal-header',
  template: `
  <span class="md-modal__title">{{headerLabel}}</span>
  <span *ngIf="message" class="md-modal__message">{{
    message
  }}</span>
  <button
    *ngIf="showCloseButton"
    class="md-close md-modal__close"
    (click)="close()"
    (keydown)="handleKeydown($event)"
    aria-label="close"
  >
  </button>
  `,
})
export class ModalHeaderComponent {
  /** @prop Optional css class string | '' */
  @Input() public class: string = '';
  /** @prop ModalHeader label text | '' */
  @Input() public headerLabel: string = '';
  /** @prop  Modal message | '' */
  @Input() public message: string = '';
  /** @prop show/hide close button | true */
  @Input() public showCloseButton: boolean = true;

  @HostBinding('class') get className(): string {
    return (
      'md-modal__header' + `${(this.class && ` ${this.class}`) || ''}` + ``
    );
  }


  @HostListener('document:keydown.escape', ['$event']) handleKeydown(
    _: KeyboardEvent
  ) {
    this.close();
  }

  constructor(private modalRef: ModalRef) {}

  close() {
    this.modalRef.close();
  }
}
