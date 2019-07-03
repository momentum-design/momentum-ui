import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { TemplateRef, Type } from '@angular/core';

interface ModalCloseEvent {
   type: 'backdropClick' | 'close';
   data: object;
}

export type ModalContent = TemplateRef<any> | Type<any>;

export class ModalRef {
  private onHide = new Subject<ModalCloseEvent>();
  onHide$ = this.onHide.asObservable();

  constructor(
    public overlay: OverlayRef,
    public content: ModalContent,
    public data: object,
    public backdropClickExit: boolean) {
      if (backdropClickExit) {
        overlay.backdropClick().subscribe(() => {
          this._close('backdropClick', null); });
      }
  }

  close(data?: object) {
    this._close('close', data);
  }

  private _close(type: ModalCloseEvent['type'], data?: object) {
    this.overlay.detach();
    this.onHide.next({
      type,
      data
    });
    this.onHide.complete();
  }
}

