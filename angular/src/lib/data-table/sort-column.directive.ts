import { HostListener, Input, Directive, NgModule } from '@angular/core';
import { DataTableComponent } from './data-table.component';

@Directive({
  selector: '[mdSortColumn]',
  host: {
    class: 'md-data-table__sortable-column',
  }
})
export class SortColumnDirective {

  @Input('mdSortColumn') field: string;

  constructor(public dt: DataTableComponent) { }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {

    this.dt.sort({
      originalEvent: event,
      field: this.field
    });
  }
}
