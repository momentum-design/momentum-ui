import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDefaultComponent } from './card-default.component';
import { CardContentComponent } from './card-content.component';
import { CardContent2Component } from './card-content2.component';
import { CardModule } from '../card.module';
import { AvatarModule, IconModule, ButtonModule } from '@momentum-ui/angular';
@NgModule({
  declarations: [
    CardDefaultComponent,
    CardContentComponent,
    CardContent2Component
  ],
  imports: [
    CommonModule,
    CardModule,
    AvatarModule,
    IconModule,
    ButtonModule
  ],
  exports: [
    CardDefaultComponent,
    CardContentComponent,
    CardContent2Component
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardExamplesModule { }
