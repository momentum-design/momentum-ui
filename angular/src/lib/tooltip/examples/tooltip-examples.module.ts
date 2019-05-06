import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDefaultComponent } from './tooltip-default.component';
import { TooltipDirectionComponent } from './tooltip-direction.component';
import { TooltipTriggerComponent } from './tooltip-trigger.component';
import { TooltipModule } from '.././tooltip.module';
import { ButtonModule } from '@momentum-ui/angular';
import { BadgeModule } from '@momentum-ui/angular';

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
