import { Component } from '@angular/core';
import { ModalService, ModalRef } from '@momentum-ui/angular';

/* Modal 1 example */
@Component({
  selector: 'small-modal1',
  template: `
    <md-modal
      htmlId="modal1"
      aria-label="modal1"
      sizeType="small"
    >
      <md-modal-header
        headerLabel="Small Modal">
      </md-modal-header>
      <md-modal-body>
        <form></form>
      </md-modal-body>
      <md-modal-footer>
        <button md-button
          alt="Close Modal"
          type="button"
          aria-label="Close Modal"
          (click)="close()"
        > Cancel
        </button>
        <button md-button
          color="blue"
          alt="Submit Form"
          type="submit"
          aria-label="Submit Form"
        >
          OK
        </button>
      </md-modal-footer>
    </md-modal>
  `
})
export class SmallModal1Component {
  sampleData;
  constructor(private modalRef: ModalRef) {
    this.sampleData = this.modalRef.data;
  }

  close() {
    this.modalRef.close(this.sampleData);
  }

}

/* Modal 2 example */
@Component({
  selector: 'small-modal2',
  template: `
    <md-modal
      htmlId="modal2"
      aria-label="modal2"
      sizeType="small"
    >
      <md-modal-header
        headerLabel="Small Modal"
        message="To create a meeting invite manually, copy and paste the meeting information and people into your email calendar invite.">
      </md-modal-header>
      <md-modal-body>
        <form></form>
      </md-modal-body>
      <md-modal-footer>
        <button md-button
          alt="Close Modal"
          type="button"
          aria-label="Close Modal"
          (click)="close()"
        > Cancel
        </button>
        <button md-button
          color="blue"
          alt="Submit Form"
          type="submit"
          aria-label="Submit Form"
        >
          OK
        </button>
      </md-modal-footer>
    </md-modal>
  `
})
export class SmallModal2Component {
  sampleData;
  constructor(private modalRef: ModalRef) {
    this.sampleData = this.modalRef.data;
  }

  close() {
    this.modalRef.close(this.sampleData);
  }

}
/* Component to call the modals from */
@Component({
  selector: 'example-modal-small',
  template: `
    <button
      md-button
      aria-label="Small Modal"
      (click)="openModal1()"
      class="btn"
    >
    Small Modal
    </button>
    <button
      md-button
      aria-label="Small Modal with Message"
      (click)="openModal2()"
      class="btn"
    >
    Small Modal with Message
    </button>
  `
})
export class ExampleModalSmallComponent {
  constructor(private modal: ModalService) {}

  openModal1() {
    const modalRef = this.modal.open({
      content: SmallModal1Component,
      data: {
        sampleData: [23, 34, 45, 56]
      },
    });
    modalRef.onHide$.subscribe( ex => {
     /* do the stuff to process here */
      /* ex is the data */
    });
  }
  openModal2() {
    const modalRef2 = this.modal.open({
      content: SmallModal2Component,
      data: {
        sampleData: [12, 99, 34, 5]
      },
    });
    modalRef2.onHide$.subscribe( ex => {
      /* do the stuff to process here */
      /* ex is the data */
    });
  }
}
