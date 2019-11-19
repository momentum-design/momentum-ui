import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { TemplateRef, Type } from '@angular/core';

interface ModalCloseEvent {
   type: 'backdropClick' | 'close';
   data: any;
}

export type ModalContent = TemplateRef<any> | Type<any>;

export class ModalRef<T = object> {
  private onHide = new Subject<ModalCloseEvent>();
  onHide$ = this.onHide.asObservable();

  constructor(
    public overlay: OverlayRef,
    public content: ModalContent,
    public data: T,
    public backdropClickExit: boolean) {
      if (backdropClickExit) {
        overlay.backdropClick().subscribe(() => {
          this._close('backdropClick', null); });
      }
  }

  close(data?: T) {
    this._close('close', data);
  }

  private _close(type: ModalCloseEvent['type'], data?: T) {
    this.overlay.detach();
    this.onHide.next({
      type,
      data
    });
    this.onHide.complete();
  }
}

