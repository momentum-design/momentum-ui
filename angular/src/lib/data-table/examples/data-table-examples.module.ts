import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { PeopleService } from './data-table-example-service';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    AvatarModule,
    SelectModule,
    HttpClientModule
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
  providers: [PeopleService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class DataTableExamplesModule { }
