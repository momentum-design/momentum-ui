import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'src/lib/avatar/avatar.module';
import { SelectModule } from 'src/lib/select/select.module';
import { DataTableModule } from '../data-table.module';
import { PeopleService } from './data-table-example-service';
import { DataTableAvatarComponent, DataTableCustomSortComponent, DataTableDefaultComponent, DataTableMultiDropdownComponent, DataTableMultiSelectCheckboxComponent, DataTableMultiSelectCheckboxResizeScrollComponent, DataTableResizeComponent, DataTableResizeScrollComponent, DataTableScrollComponent, DataTableSelectComponent, DataTableSelectionComponent, DataTableSortComponent, DataTableVirtualScrollComponent, DataTableZebraComponent, ExampleDataTableComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    DataTableMultiSelectCheckboxResizeScrollComponent,
    ExampleDataTableComponent,
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
    DataTableMultiSelectCheckboxResizeScrollComponent,
    ExampleDataTableComponent
  ],
  providers: [PeopleService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DataTableExamplesModule { }
