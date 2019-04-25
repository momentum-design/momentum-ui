import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverDefaultComponent } from './popover-default.component';
import { PopoverTriggerComponent } from './popover-trigger.component';
import { PopoverShowarrowComponent } from './popover-showarrow.component';
import { PopoverDirectionComponent } from './popover-direction.component';
import { PopoverModule } from '.././popover.module';
import { BadgeModule } from '@momentum-ui/angular';
import { ButtonModule } from '@momentum-ui/angular';

@NgModule({
  declarations: [
    PopoverDefaultComponent,
    PopoverTriggerComponent,
    PopoverShowarrowComponent,
    PopoverDirectionComponent
  ],
  imports: [
    CommonModule,
    BadgeModule,
    ButtonModule,
    PopoverModule
  ],
  exports: [
    PopoverDefaultComponent,
    PopoverTriggerComponent,
    PopoverShowarrowComponent,
    PopoverDirectionComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PopoverExamplesModule { }
