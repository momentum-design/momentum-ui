import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AlertModule, ButtonModule } from '@collab-ui/angular';
import {
  ExampleAlertDefaultComponent,
  ExampleAlertSuccessComponent
} from './index';
import { ExampleAlertWarningComponent } from './warning.component';
import { ExampleAlertErrorComponent } from './error.component';

@NgModule({
  imports: [
    AlertModule,
    ButtonModule
  ],
  declarations: [
    ExampleAlertDefaultComponent,
    ExampleAlertErrorComponent,
    ExampleAlertSuccessComponent,
    ExampleAlertWarningComponent,
  ],
  exports: [
    ExampleAlertDefaultComponent,
    ExampleAlertErrorComponent,
    ExampleAlertSuccessComponent,
    ExampleAlertWarningComponent,
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AlertExamplesModule { }
