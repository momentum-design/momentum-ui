import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TableService } from './data-table.service';
import { TemplateNameDirective } from './shared';
import { Handler } from './handler';
import findIndex from 'lodash-es/findIndex';

@Component({
  selector: 'md-data-table',
  template: `
    <div
      #container
      class="md-data-table"
      [ngClass]="[
        resizableColumns ? 'md-data-table--resizable' : '',
        autoLayout ? 'md-data-table--auto-layout' : '',
        columnDividers ? 'md-data-table--dividers' : '',
        theme ? 'md-data-table--zebra': '',
        containerClass
      ]"
      [ngStyle]="containerStyle"
    >

      <div
        *ngIf="!scrollable"
        class="md-data-table__wrapper"
      >
        <table
          #table
          [ngClass]="tableClass"
          [ngStyle]="tableStyle"
        >

          <thead class="md-data-table__thead">
            <ng-container
              *ngTemplateOutlet="headerTemplate;
              context: {$implicit: columns}">
            </ng-container>
          </thead>

          <tbody
            class="md-data-table__tbody"
            [mdBodyColumns]="columns"
            [bodyTemplate]="bodyTemplate">
          </tbody>
        </table>
      </div>

      <!-- Scroll Condition -->
      <div
        *ngIf="scrollable"
        class="md-data-table__scrollable--wrappper"
      >

        <div
          class="md-data-table__scrollable--view"
          [mdScrollView]="columns"
          [scrollHeight]="scrollHeight">
        </div>
      </div>

        <!-- Resize Helper -->
        <div
          *ngIf="resizableColumns"
          #resizeHelper
          class="md-data-table__resizer--helper md-data-table__resizer--highlight"
          style="display:none">
        </div>

    </div>
  `,
  styles: [],
  providers: [TableService],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit, AfterContentInit {

  constructor(
    public el: ElementRef,
    public zone: NgZone,
    public tableService: TableService,
    public cd: ChangeDetectorRef
  ) { }
    /** @prop set the data for the table */
    @Input() get data(): any[] {
      return this._data;
    }
    set data(val: any[]) {
      this._data = val;

      if (!this.lazy) {

        this.dataCount = (this._data ? this._data.length : 0);

        if (this.sortField) {
          this.applySort();
        }
      }

      if (this.virtualScroll && this.virtualScrollCb) {
        this.virtualScrollCb();
      }
      this.tableService.onDataChange(val);
  }

  /** @prop set the column's header and field data */
  @Input() get columns(): any[] {
    return this._columns;
  }
  set columns(cols: any[]) {
    this._columns = cols;
    this.tableService.onColumnsChange(cols);
  }

  /** @prop number of records in data set | 0 */
  @Input() get dataCount(): number {
    return this._dataCount;
  }
  set dataCount(val: number) {
    this._dataCount = val;
    this.tableService.onDataCountChange(this._dataCount);
  }

  /** @prop sets field being sorted on */
  @Input() get sortField(): string {
    return this._sortField;
  }

  set sortField(val: string) {
    this._sortField = val;

    if (this.initialized ) {
      this.applySort();
    }
  }

  /** @prop set the sort order, used with sort icons on header | 1 */
  @Input() get sortOrder(): number {
    return this._sortOrder;
  }
  set sortOrder(val: number) {
    this._sortOrder = val;

    if (this.initialized ) {
      this.applySort();
    }
  }

  /** @prop get the row number of which virtual scroll starts load  */
  @Input() get first(): number {
    return this._first;
  }
  set first(val: number) {
    this._first = val;
  }

  @Input() get selection(): any {
    return this._selection;
  }

  set selection(val: any) {
    this._selection = val;

    if (!this.preventPropagation) {
      this.updateSelectionKeys();
      this.tableService.onSelectionChange();
    }
    this.preventPropagation = false;
  }

  /** @prop set the css class on the wrapper container div | '' */
  @Input() containerClass: string = '';
  /** @prop sets the table columns to allow for resize | false */
  @Input() resizableColumns: boolean = false;
  /** @prop set css class on table element | '' */
  @Input() tableClass: string = '';
  /** @prop provide inline style to table */
  @Input() tableStyle: Object;
  /** @prop provide inline style to container div */
  @Input() containerStyle: Object;
  /** @prop start of table in ascending or descending order || 1 */
  @Input() defaultSortOrder: number = 1;
  /** @prop allow the table body to be scrollable | false */
  @Input() scrollable: boolean;
  /** @prop set the scroll height of the table | '' */
  @Input() scrollHeight: string = '';
  /** @prop sets the number of rows to load by when virtual scrolling */
  @Input() numberOfRowsToLoad: number;
  /** @prop sets lazy load mode for small sections of data to load instead of entire data | false */
  @Input() lazy: boolean = false;
  /** @prop sets virtual scroll on the data table | false */
  @Input() virtualScroll: boolean = false;
  /** @prop set the setTimeout delay in handling virtual scroll | 150 */
  @Input() virtualScrollDelay: number = 150;
  /** @prop set the virtual row height */
  @Input() virtualRowHeight: number = 34;
  /** @prop sets the widths of the table and its cells to fit for the content | false */
  @Input() autoLayout: boolean = false;
  /** @prop dataKey can be used to find rowData from selection, otherwise findIndex will run */
  @Input() dataKey: string;
  /** @prop allows for row selection click \ false */
  @Input() rowSelection: boolean = false;
  /**@prop show column dividers css border | false */
  @Input() columnDividers: boolean = false;
  /**@prop use custom sort function | false */
  @Input() customSort: boolean = false;
  /**@prop change theme of the data table | null */
  @Input() theme: string = '';

  /**@prop emit custom sort function */
  @Output() sortBy: EventEmitter<any> = new EventEmitter();
  /**@prop emit function after column sort */
  @Output() afterSort: EventEmitter<any> = new EventEmitter();
  /**@prop emit function after column resize end */
  @Output() afterColResize: EventEmitter<any> = new EventEmitter();
  /**@prop  emit function triggering load data*/
  @Output() lazyLoad: EventEmitter<any> = new EventEmitter();
  /**@prop emit function when toggling header checkbox */
  @Output() headerCheckboxToggle: EventEmitter<any> = new EventEmitter();
  /**@prop emit function when checked selection changes */
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();
  /**@prop emit function when row is checked */
  @Output() rowCheck: EventEmitter<any> = new EventEmitter();
  /**@prop emit function when row is unchecked */
  @Output() rowUncheck: EventEmitter<any> = new EventEmitter();
  /**@prop emit function when table row is selected  */
  @Output() rowSelect: EventEmitter<any> = new EventEmitter();
  /**@prop emit function when table row is unselected */
  @Output() rowUnselect: EventEmitter<any> = new EventEmitter();

  @ViewChild('container') containerViewChild: ElementRef;
  @ViewChild('resizeHelper') resizeHelperViewChild: ElementRef;
  @ViewChild('table') tableViewChild: ElementRef;
  @ContentChildren(TemplateNameDirective) templates: QueryList<TemplateNameDirective>;

  _data: any[] = [];
  _columns: any[];
  _dataCount: number = 0;
  headerTemplate: TemplateRef<any>;
  bodyTemplate: TemplateRef<any>;
  colGroupTemplate: TemplateRef<any>;
  _sortField: string;
  _sortOrder: number = 1;
  resizerX: number;
  _first: number = 0;
  virtualScrollCb: Function;
  virtualScrollTimer: any;
  initialized: boolean;
  _selection: any;
  selectionKeys: any = {}; // for adding and removing to selection
  preventPropagation: boolean;

  @Input() rowTrackBy: Function = (index: number, item: any) => item;

  ngOnInit() {
    this.initialized = true;
  }

  ngAfterContentInit() {
    // sort out mdTemplateName to the correct templateOutlet
    this.templates.forEach((item) => {
      switch (item.getType()) {

        case 'header':
          this.headerTemplate = item.template;
        break;

        case 'body':
          this.bodyTemplate = item.template;
        break;

        case 'colgroup':
          this.colGroupTemplate = item.template;
        break;
      }
    });
  }

  // Sort Methods

  isColumnSorted(field: string) { // check to see if it has been sorted, used for sort icon
    return (this.sortField === field);
  }

  sort(event) {
    this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
    this._sortField = event.field;

    this.applySort();
  }

  applySort() {
    if (this.sortField && this.sortOrder) {
      if (this.data) {
        if (this.customSort) {
          this.sortBy.emit({
              data: this.data,
              field: this.sortField,
              order: this.sortOrder
          });
      } else {
          this.data.sort((data1, data2) => {
            const value1 = data1[this.sortField];
            const value2 = data2[this.sortField];
            let result;

            if (value1 === null && value2 !== null) {
              result = -1;
            } else if (value1 !== null && value2 === null) {
              result = 1;
            } else if (value1 === null && value2 === null) {
              result = 0;
            } else if (typeof value1 === 'string' && typeof value2 === 'string') {
              result = value1.localeCompare(value2);
            } else {
              result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
            }

            return (this.sortOrder * result);
          });
        }
      }

      const sortObj = {
        field: this.sortField,
        order: this.sortOrder
      };

      this.afterSort.emit(sortObj);
      this.tableService.afterSort(sortObj);
    }
  }

  // Resize Methods

  onColumnResizeStart(event) {
    const leftContainer = Handler.getOffset(this.containerViewChild.nativeElement).left;
    this.resizerX = (event.pageX - leftContainer + this.containerViewChild.nativeElement.scrollLeft);
    event.preventDefault();
  }

  onColumnResize(event) {
    const leftContainer = Handler.getOffset(this.containerViewChild.nativeElement).left;

    this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
    this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
    // tslint:disable-next-line: max-line-length
    this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - leftContainer + this.containerViewChild.nativeElement.scrollLeft) + 'px';
    // display none start
    this.resizeHelperViewChild.nativeElement.style.display = 'block';
  }

  onColumnResizeEnd(event, column) {
    let movedDistance = this.resizeHelperViewChild.nativeElement.offsetLeft - this.resizerX;
    const columnWidth = column.offsetWidth;
    const minWidth = parseInt(column.style.minWidth || 15, 10);

    if (columnWidth + movedDistance < minWidth) {
      movedDistance = minWidth - columnWidth;
    }

    const newColumnWidth = columnWidth + movedDistance;

    if (newColumnWidth >= minWidth) {

      let nextColumn = column.nextElementSibling;

      while (!nextColumn.offsetParent) {
        nextColumn = nextColumn.nextElementSibling;
      }

      if (nextColumn) {
          const nextColumnWidth = nextColumn.offsetWidth - movedDistance;
          const nextColumnMinWidth = nextColumn.style.minWidth || 15;

        if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth, 10)) {

          if (this.scrollable) {
            const scrollableView = this.findParentScrollableView(column);

            // finds element
            const scrollableBodyTable = Handler.findSingle(scrollableView, 'table.md-data-table__scrollable--body-table');
            const scrollableHeaderTable = Handler.findSingle(scrollableView, 'table.md-data-table__scrollable--header-table');

            let resizeColumnIndex;
            let num = 0;
            const columns = column.parentNode.childNodes;

            for (let i = 0; i < columns.length; i++) {
              if (columns[i] === column) {
                resizeColumnIndex = num;
              }
              if (columns[i].nodeType === 1) {
                num++;
              }
            }

            // resize both the header and the body to match new width
            this.resizeColumnGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
            this.resizeColumnGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
          } else {

            column.style.width = newColumnWidth + 'px';

            if (nextColumn) {
              nextColumn.style.width = nextColumnWidth + 'px';
            }
          }
        }
      }

      this.afterColResize.emit({
        element: column,
        movedDistance: movedDistance
      });
    }
  // hide resize helper line on end
    this.resizeHelperViewChild.nativeElement.style.display = 'none';
  }

  findParentScrollableView(column) {
    if (column) {
      let parent = column.parentElement;

      while (parent && !parent.classList.contains('md-data-table__scrollable--view')) {
        parent = parent.parentElement;
      }

      return parent;
    } else {
      return null;
    }
  }

  resizeColumnGroup(tableSection, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
    if (tableSection) {
      // find colGroup
      const colGroup = tableSection.children[0].nodeName === 'COLGROUP' ? tableSection.children[0] : null;

      if (colGroup) {
        const col = colGroup.children[resizeColumnIndex];
        const nextColumn = col.nextElementSibling;
        col.style.width = newColumnWidth + 'px';

        if (nextColumn && nextColumnWidth) {
          nextColumn.style.width = nextColumnWidth + 'px';
        }
      } else {
        throw new Error('Tables with scroll that resize require a colgroup, refer to example');
      }
    }
  }

  // Virtual Scroll

  handleVirtualScroll(event) {
    this.first = (event.page - 1) * this.numberOfRowsToLoad;
    this.virtualScrollCb = event.callback;

    this.zone.run(() => {
      if (this.virtualScrollTimer) {
        clearTimeout(this.virtualScrollTimer);
      }

      this.virtualScrollTimer = setTimeout(() => {
        this.lazyLoad.emit(this.createLazyData());
      }, this.virtualScrollDelay);
    });
  }

  createLazyData(): any {
    return {
      first: this.first,
      numberOfRowsToLoad: this.numberOfRowsToLoad,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
    };
  }

  // Select

  updateSelectionKeys() {
    if (this.dataKey && this._selection) {

      this.selectionKeys = {};
      if (Array.isArray(this._selection)) {
        for (const data of this._selection) {
          this.selectionKeys[String(data[this.dataKey])] = 1;
        }
      } else {
        this.selectionKeys[String(this._selection[this.dataKey])] = 1;
      }
    }
  }

  isSelected(rowData) {
    if (rowData && this.selection) {
      if (this.dataKey) {
        for (let i = 0; i < this.selection.length; i++) {
          if (this.selection[i][this.dataKey] === rowData[this.dataKey]) {
            this.selectionKeys[rowData[this.dataKey]] = 1;
          }
        }
        return this.selectionKeys[rowData[this.dataKey]] !== undefined; // found in selection
      } else {
        if (this.selection instanceof Array) {
          return findIndex(this.selection, rowData) > -1;
        } else {
          return this.selection === rowData;
        }
      }
    }
    return false;
  }

  toggleRowsWithCheckbox(event: Event, check: boolean) {
    this._selection = check ? this.data.slice() : [];

    this.preventPropagation = true;
    this.updateSelectionKeys();
    this.selectionChange.emit(this._selection);
    this.tableService.onSelectionChange();

    this.headerCheckboxToggle.emit({originalEvent: event, checked: check});
  }

  toggleRowWithCheckbox(event, rowData: any) {

    this.selection = this.selection || [];
    const isChecked = this.isSelected(rowData);

    const rowDataKeyValue = this.dataKey ? String(rowData[this.dataKey]) : null;

    this.preventPropagation = true;

    if (isChecked) { // then uncheck from selection
      const checkedIndex = findIndex(this.selection, rowData);
      this._selection = this.selection.filter((val, i) => i !== checkedIndex);
      this.selectionChange.emit(this.selection);

      this.rowUncheck.emit({
        originalEvent: event.originalEvent,
        data: rowData,
      });

      if (rowDataKeyValue) {
        delete this.selectionKeys[rowDataKeyValue];
      }

    } else { // add to selection
      this._selection = this.selection ? [...this.selection, rowData] : [rowData];
      this.selectionChange.emit(this.selection);

      this.rowCheck.emit({
        originalEvent: event.originalEvent,
        data: rowData,
      });

      if (rowDataKeyValue) {
        this.selectionKeys[rowDataKeyValue] = 1;
      }
    }
    this.tableService.onSelectionChange();
  }

  // row click selection
  handleRowClick(event) {
    if (this.rowSelection) {

      this.preventPropagation = true;

      const rowData = event.rowData;
      const selected = this.isSelected(rowData);
      const dataKeyValue = this.dataKey ? String(rowData[this.dataKey]) : null;

      if (selected) { // then unselect to null
        this._selection = null;
        this.selectionKeys = {};
        this.selectionChange.emit(this.selection);

        this.rowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
      } else { // select
        this._selection = rowData;
        this.selectionChange.emit(this.selection);
        this.rowSelect.emit({
          originalEvent: event.originalEvent,
          data: rowData,
          type: 'row',
        });

        if (dataKeyValue) {
          this.selectionKeys = {};
          this.selectionKeys[dataKeyValue] = 1;
        }
      }

      this.tableService.onSelectionChange();
    }
  }
}

// Body Component
@Component({
  selector: '[mdBodyColumns]',
  template: `
    <ng-container>

      <ng-template
        ngFor let-row let-rowIndex="index"
        [ngForOf]="dt.data"
        [ngForTrackBy]="dt.rowTrackBy"
      >
        <ng-container
          *ngTemplateOutlet="bodyTemplate;
          context: {
            $implicit: row,
            columns: columns,
            rowIndex: rowIndex
          }">
        </ng-container>
      </ng-template>

    </ng-container>
  `
})

export class TableBodyComponent {
  // tslint:disable-next-line: no-input-rename
  @Input('mdBodyColumns') columns;
  @Input() bodyTemplate: TemplateRef<any>;

  constructor(public dt: DataTableComponent) {}
}
