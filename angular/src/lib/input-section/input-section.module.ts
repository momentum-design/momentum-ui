import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { InputSectionComponent } from './input-section.component';

@NgModule({
  declarations: [InputSectionComponent],
  imports: [CommonModule],
  exports: [InputSectionComponent],
})

export class InputSectionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InputSectionModule,
      providers: [],
    };
  }
}
