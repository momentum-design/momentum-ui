import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { ActivityButtonComponent } from './activity-button.component';

@NgModule({
  declarations: [ActivityButtonComponent],
  imports: [
    CommonModule,
    ButtonModule,
    IconModule
  ],
  exports: [ActivityButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ActivityButtonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ActivityButtonModule,
      providers: [],
    };
  }
 }
