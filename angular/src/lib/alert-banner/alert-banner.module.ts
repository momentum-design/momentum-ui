import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon';
import { AlertBannerComponent } from './alert-banner.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [AlertBannerComponent],
  exports: [AlertBannerComponent],
})
export class AlertBannerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AlertBannerModule,
      providers: [],
    };
  }
}
