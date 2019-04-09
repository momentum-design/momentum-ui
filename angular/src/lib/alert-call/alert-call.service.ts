import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable, OnDestroy } from '@angular/core';
import { AlertCallConfig } from './alert-call-config';
import { AlertCallContainerComponent } from './alert-call-container.component';
import { AlertCallDevice } from './device-list-call.component';

@Injectable()
export class AlertCallService implements OnDestroy {
  private _overlayRef?: OverlayRef | null = null;
  private _alertContainerRef?: ComponentRef<AlertCallContainerComponent> | null = null;

  constructor(private _overlay: Overlay) {}

  show(config: AlertCallConfig): string {
    if (!this._overlayRef) {
      this._overlayRef = this._overlay.create();
    }
    const container = this._attachAlertContainer(this._overlayRef);
    if (config.devices) {
      config.devices = config.devices.map(device => {
        return {...new AlertCallDevice(), ...device};
      });
    }
    const _config = {...new AlertCallConfig(), ...config};
    return container.addAlert(_config);
  }

  hide(key: string): void {
    if (this._alertContainerRef) {
      this._alertContainerRef.instance.removeAlert(key);
    }
  }

  private _attachAlertContainer(overlayRef: OverlayRef): AlertCallContainerComponent {
    if (this._alertContainerRef) {
      return this._alertContainerRef.instance;
    }

    const containerPortal = new ComponentPortal(AlertCallContainerComponent);
    this._alertContainerRef = overlayRef.attach(containerPortal);
    const onDestroySub = this._alertContainerRef.instance._onDestroy.subscribe(() => {
      onDestroySub.unsubscribe();
      this._dispose();
    });
    return this._alertContainerRef.instance;
  }

  ngOnDestroy() {
    if (this._alertContainerRef) {
      this._alertContainerRef.instance.destroy();
    }
  }

  private _dispose(): void {
    this._alertContainerRef = null;
    this._overlayRef.dispose();
    this._overlayRef = null;
  }
}
