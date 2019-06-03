import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector, OnDestroy } from '@angular/core';
import { LightboxConfig } from './lightbox-config';
import { LightboxComponent } from './lightbox.component';

@Injectable()
export class LightboxService implements OnDestroy {
  private _overlayRef?: OverlayRef | null = null;
  private _lightboxRef?: ComponentRef<LightboxComponent> | null = null;

  constructor(private _overlay: Overlay, private _injector: Injector) {}

  open(config: LightboxConfig): LightboxComponent {
    const _config = { ...new LightboxConfig(), ...config };

    if (!this._overlayRef) {
      this._overlayRef = this._overlay.create();
    }
    return this._attachLightboxContainer(this._overlayRef, _config);
  }

  close(): void {
    if (this._lightboxRef) {
      this._lightboxRef.instance.destroy();
    }
  }

  private _attachLightboxContainer(overlayRef: OverlayRef, config: LightboxConfig): LightboxComponent {
    if (this._lightboxRef) {
      return this._lightboxRef.instance;
    }

    const injector = new PortalInjector(
      this._injector,
      new WeakMap([[LightboxConfig, config]])
    );
    const containerPortal = new ComponentPortal(LightboxComponent, null, injector);
    this._lightboxRef = overlayRef.attach(containerPortal);
    const onDestroySub = this._lightboxRef.instance._onDestroy.subscribe(
      () => {
        onDestroySub.unsubscribe();
        this._dispose();
      }
    );
    return this._lightboxRef.instance;
  }

  ngOnDestroy() {
    if (this._lightboxRef) {
      this._lightboxRef.instance.destroy();
    }
  }

  private _dispose(): void {
    this._lightboxRef = null;
    this._overlayRef.dispose();
    this._overlayRef = null;
  }
}
