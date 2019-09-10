import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule,
  IconModule,
  ListModule,
  ListItemModule,
  TopbarModule,
} from '@momentum-ui/angular';
import {
  ExampleTopbarBlueComponent,
  ExampleTopbarDarkComponent,
  ExampleTopbarLightComponent,
  ExampleTopbarNomiddleComponent
} from './index';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    ListModule,
    ListItemModule,
    TopbarModule,
  ],
  declarations: [
    ExampleTopbarBlueComponent,
    ExampleTopbarDarkComponent,
    ExampleTopbarLightComponent,
    ExampleTopbarNomiddleComponent
  ],
  exports: [
    ExampleTopbarBlueComponent,
    ExampleTopbarDarkComponent,
    ExampleTopbarLightComponent,
    ExampleTopbarNomiddleComponent
  ],
})
export class TopbarExamplesModule {}
