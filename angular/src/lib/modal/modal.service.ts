import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ModalRef, ModalContent } from './modal-ref';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ModalContainerComponent } from './modal-container.component';

interface ModalParams {
  content: ModalContent;
  backdrop?: boolean;
  backdropClickExit?: boolean;
  class?: string;
  sizeType?: string;
  htmlId?: string;
  ariaLabel?: string;
  data?: object;
}

@Injectable(
  {
  providedIn: 'root'
}
)
export class ModalService {
constructor(private overlay: Overlay, private injector: Injector) {}

  open({content, data, backdrop,
    backdropClickExit,
  }: ModalParams): ModalRef {

    // set defaults if not set
    if ( typeof backdropClickExit === 'undefined') {
      backdropClickExit = true;
    }
    const strategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const config = new OverlayConfig({
      hasBackdrop:  true || backdrop,
      positionStrategy: strategy,
    });
    const overlayRef = this.overlay.create(config);
    const modalRef = new ModalRef(overlayRef, content, data, backdropClickExit);

    const injector = this.createInjector(modalRef, this.injector);
    overlayRef.attach(new ComponentPortal(ModalContainerComponent, null, injector));

    return modalRef;
  }

  createInjector(modalRef: ModalRef, injector: Injector) {
    const tokens = new WeakMap([[ModalRef, modalRef]]);
    return new PortalInjector(injector, tokens);
  }


}
