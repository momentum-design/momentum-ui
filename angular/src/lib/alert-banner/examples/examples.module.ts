import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertBannerModule, ButtonModule } from '@momentum-ui/angular';
import {
  ExampleAlertBannerDefaultComponent,
  ExampleAlertBannerErrorComponent,
  ExampleAlertBannerWarningComponent,
} from './index';

@NgModule({
  imports: [CommonModule, AlertBannerModule, ButtonModule],
  declarations: [
    ExampleAlertBannerDefaultComponent,
    ExampleAlertBannerErrorComponent,
    ExampleAlertBannerWarningComponent,
  ],
  exports: [
    ExampleAlertBannerDefaultComponent,
    ExampleAlertBannerErrorComponent,
    ExampleAlertBannerWarningComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertBannerExamplesModule {}
