import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule,
  IconModule,
  ListModule,
  ListItemModule,
  TopbarModule,
} from '@collab-ui/angular';
import {
  ExampleTopbarBlueComponent,
  ExampleTopbarDarkComponent,
  ExampleTopbarLightComponent,
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
  ],
  exports: [
    ExampleTopbarBlueComponent,
    ExampleTopbarDarkComponent,
    ExampleTopbarLightComponent,
  ],
})
export class TopbarExamplesModule { }
