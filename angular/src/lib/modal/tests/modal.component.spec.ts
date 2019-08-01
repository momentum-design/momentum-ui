import { ModalModule } from '../modal.module';
import { ModalService } from '../modal.service';
import { OverlayContainer, Overlay } from '@angular/cdk/overlay';
import { Component, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, inject } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ModalRef } from '../modal-ref';

describe('Modal Service', () => {
  let modalService: ModalService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let element: HTMLElement;
  let bodyElement: HTMLElement;
  let headerElement: HTMLElement;
  let footerElement: HTMLElement;
  let viewContainerFixture: ComponentFixture<ContainerComponent>;

  @Component({
    selector: 'modal-test',
    template: `
      <md-modal
        htmlId="modal1"
        aria-label="modal1"
      >
        <md-modal-header
          headerLabel="Default Modal">
        </md-modal-header>
        <md-modal-body>
          <form></form>
        </md-modal-body>
        <md-modal-footer>
        </md-modal-footer>
      </md-modal>
    `
  })
  class ModalTestComponent {
    sampleData;
    constructor(private mr: ModalRef) {
      this.sampleData = this.mr.data;
    }
    close(event: Event) {
      this.mr.close(this.sampleData);
    }
  }

  @Component({
    selector: 'view-container',
    template: ``,
  })
  class ContainerComponent {
    constructor() {}
  }

  @NgModule({
    imports: [CommonModule, ModalModule],
    exports: [ContainerComponent],
    providers: [ModalService, Overlay],
    declarations: [ContainerComponent, ModalTestComponent],
    entryComponents: [ContainerComponent, ModalTestComponent]
  })
  class ModalTestModule {}

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule, ModalTestModule]
    });
    TestBed.compileComponents();
  }));

  beforeEach(inject([ModalService, OverlayContainer], (ms: ModalService, oc: OverlayContainer) => {
    modalService = ms;
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  beforeEach(() => {
    viewContainerFixture = TestBed.createComponent(ContainerComponent);
    viewContainerFixture.detectChanges();
  });

  it('modal should open when modalService is called', () => {
    modalService.open({
      content: ModalTestComponent,
      data: [1, 2, 3]
    });
    viewContainerFixture.detectChanges();
    element = overlayContainerElement.querySelector('md-modal');
    bodyElement = overlayContainerElement.querySelector('md-modal-body');
    headerElement = overlayContainerElement.querySelector('md-modal-header');
    footerElement = overlayContainerElement.querySelector('md-modal-footer');
    expect(element).toMatchSnapshot();
    expect(bodyElement.className).toContain('md-modal__body');
    expect(headerElement.className).toContain('md-modal__header');
    expect(footerElement.className).toContain('md-modal__footer');
  });

  it('modal should close when close is called', () => {
    const modalRef = modalService.open({
      content: ModalTestComponent,
      data: [1, 2, 3]
    });
    const afterCloseCallback = jasmine.createSpy('afterCloseCallback');
    modalRef.onHide$.subscribe(afterCloseCallback);
    modalRef.close();
    viewContainerFixture.detectChanges();
    expect(afterCloseCallback).toHaveBeenCalled();
    expect(overlayContainerElement.querySelector('md-modal')).toBeNull();
  });

});
