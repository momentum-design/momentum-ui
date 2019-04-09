/** @component modal-header */

import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cui-modal-header',
  template: `
    <ng-content></ng-content>
    <span *ngIf="hideNative" class="cui-modal__title">{{ headerLabel }}</span>
    <span *ngIf="hideNative && message" class="cui-modal__message">{{
      message
    }}</span>
    <button
      *ngIf="showCloseButton"
      cui-button
      aria-label="Close Modal"
      (click)="closeModal()"
      class="cui-close cui-modal__close"
    ></button>
  `,
  styles: [],
  providers: [],
})
export class ModalHeaderComponent implements OnInit, OnDestroy {
  /** @option Optional css class string | '' */
  @Input() public class: string = '';
  /** ModalHeader label text | '' */
  @Input() public headerLabel: string = '';
  /** Modal message | '' */
  @Input() public message: string = '';
  /** show/hide close button | true */
  @Input() public showCloseButton: boolean = true;

  @HostBinding('class') get className(): string {
    return (
      'cui-modal__header' + `${(this.class && ` ${this.class}`) || ''}` + ``
    );
  }

  private subscription: Subscription;
  public hideNative: boolean = true;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.hideNative = this.headerLabel !== '';
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeModal = () => {
    this.modalService.setModalStatus(false);
  }
}
