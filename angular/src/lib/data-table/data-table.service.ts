import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class TableService {

  private sortSource = new Subject(); // used for sort icon arrow
  sortSource$ = this.sortSource.asObservable();

  private dataSource = new Subject<any>();
  dataSource$ = this.dataSource.asObservable();

  private dataCountSource = new Subject<any>();
  dataCountSource$ = this.dataCountSource.asObservable();

  private columnsSource = new Subject();
  columnsSource$ = this.columnsSource.asObservable();

  private selectionSource = new Subject();
  selectionSource$ = this.selectionSource.asObservable();


  afterSort(sortObj) {  // sortObj = {field sorted, order: 1 || -1 }
    this.sortSource.next(sortObj);
  }

  onDataChange(value: any) {
    this.dataSource.next(value);
  }

  onDataCountChange(value: number) {
    this.dataCountSource.next(value);
  }

  onColumnsChange(columns: any[]) {
    this.columnsSource.next(columns);
  }

  onSelectionChange() {
    this.selectionSource.next();
  }
}

