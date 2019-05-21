import { Input, Directive, HostListener } from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { TableService } from './data-table.service';

@Directive({
  selector: '[mdSelectRow]',
  host: {
  class: 'md-data-table__row',
  '[class.md-data-table__row--selected]': 'isSelected()',
  '[attr.tabindex]': '0', // for focus
  }
})
export class SelectRowDirective {

  @Input('mdSelectRow') rowData: any;

  constructor(
    public dt: DataTableComponent,
    public tableService: TableService,
  ) {}

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.dt.handleRowClick({
      originalEvent: event,
      rowData: this.rowData,
    });
  }

  isSelected() {
    return this.rowData === this.dt.selection;
  }
}
