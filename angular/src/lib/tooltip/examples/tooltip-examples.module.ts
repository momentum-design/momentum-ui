import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BadgeModule, ButtonModule } from '@momentum-ui/angular';
import { TooltipModule } from '.././tooltip.module';
import { TooltipDefaultComponent } from './tooltip-default.component';
import { TooltipDirectionComponent } from './tooltip-direction.component';
import { TooltipTriggerComponent } from './tooltip-trigger.component';

@NgModule({
  declarations: [
    TooltipDefaultComponent,
    TooltipDirectionComponent,
    TooltipTriggerComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    BadgeModule,
    TooltipModule
  ],
  exports: [
    TooltipDefaultComponent,
    TooltipDirectionComponent,
    TooltipTriggerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TooltipExamplesModule { }
