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
  DataTableMultiSelectCheckboxComponent,
  DataTableAvatarComponent,
  DataTableSelectionComponent,
  DataTableCustomSortComponent,
  DataTableSelectComponent,
  DataTableMultiDropdownComponent,
  DataTableMultiSelectCheckboxResizeScrollComponent,
  DataTableZebraComponent} from './index';
import { AvatarModule } from 'src/lib/avatar/avatar.module';
import { SelectModule } from 'src/lib/select/select.module';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    AvatarModule,
    SelectModule
  ],
  exports: [
    DataTableDefaultComponent,
    DataTableResizeComponent,
    DataTableSortComponent,
    DataTableScrollComponent,
    DataTableVirtualScrollComponent,
    DataTableResizeScrollComponent,
    DataTableMultiSelectCheckboxComponent,
    DataTableAvatarComponent,
    DataTableSelectionComponent,
    DataTableCustomSortComponent,
    DataTableSelectComponent,
    DataTableMultiDropdownComponent,
    DataTableZebraComponent,
    DataTableMultiSelectCheckboxResizeScrollComponent
  ],
  declarations: [
    DataTableDefaultComponent,
    DataTableResizeComponent,
    DataTableSortComponent,
    DataTableScrollComponent,
    DataTableVirtualScrollComponent,
    DataTableResizeScrollComponent,
    DataTableMultiSelectCheckboxComponent,
    DataTableAvatarComponent,
    DataTableSelectionComponent,
    DataTableCustomSortComponent,
    DataTableSelectComponent,
    DataTableMultiDropdownComponent,
    DataTableZebraComponent,
    DataTableMultiSelectCheckboxResizeScrollComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DataTableExamplesModule { }
