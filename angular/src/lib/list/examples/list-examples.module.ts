import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListItemModule, ListModule } from '@collab-ui/angular';
import { CommonModule } from '@angular/common';
import {
  ListDefaultComponent,
  ListTabTypeComponent,
  ListTypeComponent,
  ListWrapComponent,
} from './index';

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
