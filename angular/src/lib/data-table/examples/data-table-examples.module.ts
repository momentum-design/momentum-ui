import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableModule } from '../data-table.module';
import {
  DataTableDefaultComponent,
  DataTableResizeComponent,
  DataTableSortComponent,
  DataTableScrollComponent,
  DataTableVirtualScrollComponent,
  DataTableResizeScrollComponent,
  DataTableMultiSelectComponent,
  DataTableAvatarComponent,
  DataTableSelectionComponent} from './index';
import { AvatarModule } from 'src/lib/avatar/avatar.module';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    AvatarModule
  ],
  exports: [
    DataTableDefaultComponent,
    DataTableResizeComponent,
    DataTableSortComponent,
    DataTableScrollComponent,
    DataTableVirtualScrollComponent,
    DataTableResizeScrollComponent,
    DataTableMultiSelectComponent,
    DataTableAvatarComponent,
    DataTableSelectionComponent
  ],
  declarations: [
    DataTableDefaultComponent,
    DataTableResizeComponent,
    DataTableSortComponent,
    DataTableScrollComponent,
    DataTableVirtualScrollComponent,
    DataTableResizeScrollComponent,
    DataTableMultiSelectComponent,
    DataTableAvatarComponent,
    DataTableSelectionComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DataTableExamplesModule { }
