import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { IconModule } from '../icon';
import { SpinnerModule } from '../spinner';
import { TooltipModule } from '../tooltip';
import { LightboxComponent } from './lightbox.component';
import { LightboxService } from './lightbox.service';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    IconModule,
    SpinnerModule,
    TooltipModule,
  ],
  declarations: [LightboxComponent],
  exports: [LightboxComponent],
  entryComponents: [LightboxComponent],
  providers: [LightboxService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LightboxModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LightboxModule,
      providers: [],
    };
  }
}
