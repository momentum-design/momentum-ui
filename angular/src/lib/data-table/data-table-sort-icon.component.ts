import { DataTableComponent } from './data-table.component';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'md-sortIcon',
  template: `
    <i class="md-icon icon md-sortIcon"
      [ngClass]="[
        sorted === 1 ? 'icon-arrow-filled-down_12' : 'icon-arrow-filled-up_12'
      ]">
    </i>
  `
})

export class TableSortIconComponent implements OnInit, OnDestroy {

  @Input() field: string;
  subscription: Subscription;
  sorted: number;

  constructor(public dt: DataTableComponent) {
    this.subscription = this.dt.tableService.sortSource$.subscribe(() => {
      this.updateSortIcon();
    });
   }

  ngOnInit() {
    this.updateSortIcon();
  }

  updateSortIcon() {
    this.sorted = this.dt.isColumnSorted(this.field) ? this.dt.sortOrder : -1;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
