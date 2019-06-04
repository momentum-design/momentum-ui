import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { ListModule } from '../list/list.module';
import { ListItemModule } from '../list-item/list-item.module';

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
