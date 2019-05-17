import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './badge.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BadgeComponent],
  exports: [BadgeComponent],
})
export class BadgeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BadgeModule,
      providers: [],
    };
  }
}
