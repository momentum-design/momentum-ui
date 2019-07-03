import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Injector } from '@angular/core';
import { ModalModule, ModalRef } from '@momentum-ui/angular/modal';
import { ModalService } from '../modal.service';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';

describe('modalService: ModalService', () => {
  let modalService: ModalService;
  let overlay: Overlay;
  let testinjector: Injector;
  let overlayContainerElement: HTMLElement;

  @Component({
    selector: 'test-modal',
    template: `<md-modal
      htmlId="modal1"
      aria-label="modal1"
    >
      <md-modal-header
        (closeButtonClick)="closeModal(event)"
        headerLabel="Default Modal">
      </md-modal-header>
      <md-modal-body>
        <form></form>
      </md-modal-body>
      <md-modal-footer>
        <button md-button
          alt="Close Modal"
          type="button"
          aria-label="Close Modal"
          (click)="closeModal(event)"
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
  </md-modal>`
  })
  class TestModalComponent {
    sampleData;
    constructor(private modalRef: ModalRef) {
      this.sampleData = this.modalRef.data;
    }

    close() {
      this.modalRef.close(this.sampleData);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestModalComponent ],
      imports: [ ModalModule ],
      providers: [ { provide: OverlayContainer, useFactory: () => {
        overlayContainerElement = document.createElement('div');
        return { getContainerElement: () => overlayContainerElement };
      }}, ModalService, Overlay ]
    }).compileComponents();
  }));


  it('should create a modal reference', () => {
    overlay = TestBed.get(Overlay);
    testinjector = TestBed.get(Injector);
    modalService = new ModalService(overlay, testinjector);
    const modalRef = modalService.open({
      content: TestModalComponent,
      data: [1, 3, 4, 5]
    });
    expect(modalRef).not.toBeNull();
  });

});

