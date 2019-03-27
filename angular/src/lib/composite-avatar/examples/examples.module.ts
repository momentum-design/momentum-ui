import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule, CompositeAvatarModule } from '@collab-ui/angular';
import { ExampleCompositeAvatarComponent } from './index';

@NgModule({
  imports: [CommonModule, AvatarModule, CompositeAvatarModule],
  declarations: [ExampleCompositeAvatarComponent],
  exports: [ExampleCompositeAvatarComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CompositeAvatarExamplesModule {}
