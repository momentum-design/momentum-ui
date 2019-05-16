import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { ButtonModule } from '../button';
import { IconModule } from '../icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { ListModule } from '../list';
import { ListItemModule } from '../list-item';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    PortalModule,
    ListModule,
    ListItemModule,
    OverlayModule,
    A11yModule,
  ],
  declarations: [
    SelectComponent,
  ],
  exports: [SelectComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SelectModule,
      providers: [],
    };
  }
}
