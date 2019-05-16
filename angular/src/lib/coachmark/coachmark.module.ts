import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachmarkComponent } from './coachmark.component';

@NgModule({
  declarations: [CoachmarkComponent],
  imports: [
    CommonModule
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
