import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityButtonDefaultComponent } from './activity-button-default.component';
import { ActivityButtonModule } from '../activity-button.module';

@NgModule({
  declarations: [ActivityButtonDefaultComponent],
  imports: [
    CommonModule,
    ActivityButtonModule
  ],
  exports: [ActivityButtonDefaultComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ActivityButtonExamplesModule { }
