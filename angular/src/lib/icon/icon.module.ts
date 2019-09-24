import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  imports: [ButtonModule, CommonModule],
  declarations: [IconComponent],
  exports: [ButtonModule, IconComponent],
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
