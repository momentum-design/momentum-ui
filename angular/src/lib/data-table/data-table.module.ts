import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DataTableComponent,
  TableBodyComponent,
} from './data-table.component';
import {
  DataTableCheckboxHeaderComponent,
  DataTableCheckboxComponent
} from './data-table-checkbox.component';
import { SortColumnDirective } from './sort-column.directive';
import { ResizableColumnDirective } from './resize-column.directive';
import { ScrollComponent } from './data-table-scroll.component';
import { TableSortIconComponent } from './data-table-sort-icon.component';
import { SelectRowDirective } from './data-table-select-row.directive';

import { SharedModule } from './shared';
import { IconModule } from '../icon/icon.module';
import { SpinnerModule } from '../spinner/spinner.module';
import { AvatarModule } from '../avatar/avatar.module';
import { CheckboxModule } from '../checkbox/checkbox.module';


@NgModule({
  imports: [
    CommonModule,
    SpinnerModule,
    IconModule,
    AvatarModule,
    CheckboxModule
  ],
  exports: [
    DataTableComponent,
    SharedModule,
    TableBodyComponent,
    SortColumnDirective,
    ResizableColumnDirective,
    ScrollComponent,
    DataTableCheckboxHeaderComponent,
    DataTableCheckboxComponent,
    TableSortIconComponent,
    SelectRowDirective
  ],
  declarations: [
    DataTableComponent,
    TableBodyComponent,
    SortColumnDirective,
    ResizableColumnDirective,
    ScrollComponent,
    DataTableCheckboxHeaderComponent,
    DataTableCheckboxComponent,
    TableSortIconComponent,
    SelectRowDirective
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DataTableModule { }
