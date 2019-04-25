import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallControlModule, ButtonModule } from '@momentum-ui/angular';
import {
  ExampleCallControlActiveComponent,
  ExampleCallControlCancelComponent,
  ExampleCallControlDefaultComponent,
  ExampleCallControlDisableComponent,
} from './index';

@NgModule({
  imports: [CommonModule, CallControlModule, ButtonModule],
  declarations: [
    ExampleCallControlActiveComponent,
    ExampleCallControlCancelComponent,
    ExampleCallControlDefaultComponent,
    ExampleCallControlDisableComponent,
  ],
  exports: [
    ExampleCallControlActiveComponent,
    ExampleCallControlCancelComponent,
    ExampleCallControlDefaultComponent,
    ExampleCallControlDisableComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CallControlExamplesModule {}
