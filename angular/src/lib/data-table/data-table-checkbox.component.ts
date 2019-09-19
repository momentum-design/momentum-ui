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
import uniqueId from 'lodash-es/uniqueId';

@Component({
  selector: 'md-data-table-header-checkbox',
  template: `
  <div
    class="md-data-table__checkbox--wrapper"
    [ngClass]="[className]"
    (click)="handleClick($event)"
  >
    <md-checkbox
      [(checkStatus)]="checked"
      [disabled]="disabled"
      (click)="handleClick($event)"
      htmlId="{{id}}-checkbox">
    </md-checkbox>
  </div>
  `
})
export class DataTableCheckboxHeaderComponent implements OnInit, OnDestroy {

  @Input() disabled: boolean;
  @Input() className: string = '';
  @Input() id = uniqueId('md-data-table-header-checkbox-');

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

  handleClick(event: Event) {
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
      class="md-data-table__checkbox--wrapper"
      [ngClass]="[className]"
      (click)="handleClick($event)"
    >
      <md-checkbox
        [(checkStatus)]="checked"
        [disabled]="disabled"
        htmlId="{{id}}-checkbox">
      </md-checkbox>
    </div>
  `
})
export class DataTableCheckboxComponent implements OnInit, OnDestroy {

  @Input() data: any;
  @Input() disabled: boolean = false;
  @Input() className: string = ' ';
  @Input() id = uniqueId('md-data-table-checkbox-');

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

  handleClick(event: Event) {
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
