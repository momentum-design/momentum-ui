import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { TableService } from './data-table.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'md-data-table-header-checkbox',
  template: `
  <div
    class="md-data-table__checkbox-header--wrapper"
    (click)="onClick($event)"
  >

    <div class="md-data-table__checkbox-header">
      <input
        type="checkbox"
        class="md-checkbox__input"
        [checked]="checked"
        [disabled]="disabled"
      >
    </div>
  </div>
  `
})
export class DataTableCheckboxHeaderComponent implements OnInit, OnDestroy {

  @Input() disabled: boolean;

  checked: boolean;
  selectionChangeSubscription: Subscription;
  valueChangeSubscription: Subscription;

  constructor(
    public dt: DataTableComponent,
    public tableService: TableService
  ) {
    this.valueChangeSubscription = this.dt.tableService.dataSource$.subscribe(() => {
      this.checked = this.updateCheckedState();
    });

    this.selectionChangeSubscription = this.dt.tableService.selectionSource$.subscribe(() => {
      this.checked = this.updateCheckedState();
    });
  }

  ngOnInit() {
    this.checked = this.updateCheckedState();
  }

  onClick(event: Event) {
    if (!this.disabled) {
      if (this.dt.data && this.dt.data.length > 0) {
        this.dt.toggleRowsWithCheckbox(event, !this.checked);
      }
    }
  }

  updateCheckedState() {
    return (
      this.dt.data && this.dt.data.length > 0
      && this.dt.selection && this.dt.selection.length > 0
      && this.dt.selection.length === this.dt.data.length
      );
    }

  ngOnDestroy() {
    if (this.selectionChangeSubscription) {
      this.selectionChangeSubscription.unsubscribe();
    }

    if (this.valueChangeSubscription) {
      this.valueChangeSubscription.unsubscribe();
    }
  }
}


@Component({
  selector: 'md-data-table-checkbox',
  template: `
    <div
      class="md-data-table__checkbox-header--wrapper"
      (click)="onClick($event)"
    >
      <div class="md-data-table__checkbox-header">
        <input
          type="checkbox"
          class="md-checkbox__input"
          [checked]="checked"
          [disabled]="disabled"
        >
      </div>
    </div>
  `
})
export class DataTableCheckboxComponent implements OnInit, OnDestroy {

  @Input() data: any;
  @Input() disabled: boolean = false;

  @ViewChild('box') boxViewChild: ElementRef;

  checked: boolean;

  subscription: Subscription;

  constructor(public dt: DataTableComponent, public tableService: TableService) {
    this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
      this.checked = this.dt.isSelected(this.data);
    });
  }

  ngOnInit() {
    this.checked = this.dt.isSelected(this.data);
  }

  onClick(event: Event) {
    if (!this.disabled) {
      this.dt.toggleRowWithCheckbox({
        originalEvent: event,
      }, this.data);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
