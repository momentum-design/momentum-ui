/** @component modal-container */

import {
  Component,
  OnInit
} from '@angular/core';
import { ModalContent, ModalRef } from './modal-ref';

@Component({
  selector: 'md-modal-container',
  template: `
  <ng-container>
    <ng-container *ngComponentOutlet="content"></ng-container>
  </ng-container>
  `,
})
export class ModalContainerComponent  implements OnInit {

   public content: ModalContent;
   public context;

   constructor( private modalRef: ModalRef) {}

  ngOnInit() {
    this.content = this.modalRef.content;
    this.context = {
      close: this.modalRef.close.bind(this.modalRef)
    };

  }

}
