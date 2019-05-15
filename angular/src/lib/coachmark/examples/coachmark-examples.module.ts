import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachmarkDefaultComponent } from './coachmark-default.component';
import { CoachmarkDelayComponent } from './coachmark-delay.component';
import { CoachmarkOpenComponent } from './coachmark-open.component';
import { CoachmarkArrowComponent } from './coachmark-arrow.component';
import { CoachmarkBackdropComponent } from './coachmark-backdrop.component';
import { CoachmarkModule } from '@momentum-ui/angular';

@NgModule({
  declarations: [
    CoachmarkDefaultComponent,
    CoachmarkDelayComponent,
    CoachmarkOpenComponent,
    CoachmarkArrowComponent,
    CoachmarkBackdropComponent
  ],
  imports: [
    CommonModule,
    CoachmarkModule
  ],
  exports: [
    CoachmarkDefaultComponent,
    CoachmarkDelayComponent,
    CoachmarkOpenComponent,
    CoachmarkArrowComponent,
    CoachmarkBackdropComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoachmarkExamplesModule { }
