import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';

@NgModule({
  imports: [CommonModule],
  declarations: [IconComponent],
  exports: [IconComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IconModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IconModule,
      providers: [],
    };
  }
}
