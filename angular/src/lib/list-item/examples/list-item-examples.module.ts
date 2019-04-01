import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListItemModule, ListModule } from '@collab-ui/angular';
import { CommonModule } from '@angular/common';
import { ListItemDefaultComponent } from './list-item-default.component';
import { ListItemDisabledComponent } from './list-item-disabled.component';
import { ListItemTypeComponent } from './list-item-type.component';

@NgModule({
  declarations: [
    ListItemDefaultComponent,
    ListItemDisabledComponent,
    ListItemTypeComponent
  ],
  imports: [
    CommonModule,
    ListModule,
    ListItemModule
  ],
  exports: [
    ListItemDefaultComponent,
    ListItemDisabledComponent,
    ListItemTypeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListItemExamplesModule { }
