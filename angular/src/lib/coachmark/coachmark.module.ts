import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { CoachmarkComponent } from './coachmark.component';

@NgModule({
  declarations: [CoachmarkComponent],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [CoachmarkComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CoachmarkModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoachmarkModule,
      providers: [],
    };
  }
}
