import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '@momentum/angular';

@Component({
  selector: 'example-modal-default',
  template: `
    <md-modal-body [ngClass]="'custom-ng-class'">22222</md-modal-body>
    <a (click)='showModal()'>open</a>
    <md-modal #modal [whenHide]='onHide()' class='myClass' sizeType='small'>
      <md-modal-header headerLabel='Title' message='message'  ></md-modal-header>
      <md-modal-body [ngClass]="'custom-ng-class'">Body</md-modal-body>
      <md-modal-footer>
        <a (click)='closeModal()'>close</a>
      </md-modal-footer>
    </md-modal>
  `
})
export class ExampleModalDefaultComponent {

  @ViewChild('modal') modal: ModalComponent;

  constructor() {

  }

  closeModal = () => {
    this.modal.closeModal();
  }

  showModal = () => {
    this.modal.showModal();
  }

  onHide = () => {

  }
}
