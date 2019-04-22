import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BadgeModule } from '@momentum-ui/angular';
import {
  ExampleBadgeDefaultComponent,
  ExampleBadgeRoundComponent,
} from './index';

@NgModule({
  imports: [BadgeModule],
  exports: [ExampleBadgeDefaultComponent, ExampleBadgeRoundComponent],
  declarations: [ExampleBadgeDefaultComponent, ExampleBadgeRoundComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BadgeExamplesModule {}
