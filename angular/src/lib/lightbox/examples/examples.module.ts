import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, LightboxModule } from '@momentum-ui/angular';
import { ExampleLightboxDefaultComponent, ExampleLightboxMultipleComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    LightboxModule,
  ],
  declarations: [ExampleLightboxDefaultComponent, ExampleLightboxMultipleComponent],
  exports: [ExampleLightboxDefaultComponent, ExampleLightboxMultipleComponent],
})
export class LightboxExamplesModule {}
