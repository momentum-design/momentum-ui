import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListItemModule, ListModule } from '@collab-ui/angular';
import { CommonModule } from '@angular/common';
import { ListDefaultComponent } from './list-default.component';
import { ListTabTypeComponent } from './list-tab-type.component';
import { ListTypeComponent } from './list-type.component';
import { ListWrapComponent } from './list-wrap.component';

@NgModule({
  declarations: [
    ListDefaultComponent,
    ListTabTypeComponent,
    ListTypeComponent,
    ListWrapComponent
  ],
  imports: [
    CommonModule,
    ListModule,
    ListItemModule
  ],
  exports: [
    ListDefaultComponent,
    ListTabTypeComponent,
    ListTypeComponent,
    ListWrapComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListExamplesModule { }
