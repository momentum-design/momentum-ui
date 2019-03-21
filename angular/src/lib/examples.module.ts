import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AlertExamplesModule } from './alert/examples/examples.module';
import { AlertBannerExamplesModule } from './alert-banner/examples/examples.module';
import { AvatarExamplesModule } from './avatar/examples/examples.module';
import { BadgeExamplesModule } from './badge/examples/examples.module';
import { ButtonExamplesModule } from './button/examples/examples.module';
import { CheckboxExamplesModule } from './checkbox/examples/examples.module';
import { CompositeAvatarExamplesModule } from './composite-avatar/examples/examples.module';
import { RadioExamplesModule } from './radio/examples/examples.module';
import { InputExamplesModule } from './input/examples/examples.module';
import { SearchInputExamplesModule } from './search-input/examples/search-input-examples.module';
import { SliderExamplesModule } from './slider/examples/examples.module';
import { TabsExamplesModule } from './tabs/examples/examples.module';
import { ToggleSwitchExamplesModule } from './toggle-switch/examples/toggle-switch-examples.module';
import { TopbarExamplesModule } from './topbar/examples/examples.module';

@NgModule({
  imports: [
    AlertExamplesModule,
    AlertBannerExamplesModule,
    AvatarExamplesModule,
    BadgeExamplesModule,
    ButtonExamplesModule,
    CheckboxExamplesModule,
    CompositeAvatarExamplesModule,
    RadioExamplesModule,
    InputExamplesModule,
    SearchInputExamplesModule,
    SliderExamplesModule,
    TabsExamplesModule,
    ToggleSwitchExamplesModule,
    TopbarExamplesModule,
  ],
  exports: [
    AlertExamplesModule,
    AlertBannerExamplesModule,
    AvatarExamplesModule,
    BadgeExamplesModule,
    ButtonExamplesModule,
    CheckboxExamplesModule,
    CompositeAvatarExamplesModule,
    RadioExamplesModule,
    InputExamplesModule,
    SearchInputExamplesModule,
    SliderExamplesModule,
    TabsExamplesModule,
    ToggleSwitchExamplesModule,
    TopbarExamplesModule,
  ],
  declarations: [],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class ExamplesModule { }
