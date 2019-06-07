import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerDefaultComponent } from './drawer-default.component';
import { DrawerOpenfromComponent } from './drawer-openfrom.component';
import { DrawerModule } from '../drawer.module';
import { ButtonModule } from '@momentum-ui/angular';

@NgModule({
  declarations: [DrawerDefaultComponent, DrawerOpenfromComponent],
  imports: [
    CommonModule,
    DrawerModule,
    ButtonModule
  ],
  exports: [DrawerDefaultComponent, DrawerOpenfromComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrawerExamplesModule { }
