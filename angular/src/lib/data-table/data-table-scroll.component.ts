import {
  Component,
  AfterViewInit,
  OnDestroy,
  AfterViewChecked,
  Input,
  ViewChild,
  ElementRef,
  NgZone } from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { Subscription } from 'rxjs';
import { Handler } from './handler';

@Component({
  selector: '[mdScrollView]',
  template: `
    <div #scrollHeader class="md-data-table__scrollable--header">
        <div #scrollHeaderBox>

          <table
            class="md-data-table__scrollable--header-table"
            [ngClass]="dt.tableClass"
            [ngStyle]="dt.tableStyle"
          >

            <ng-container
              *ngTemplateOutlet="dt.colGroupTemplate; context {$implicit: columns}">
            </ng-container>

            <thead class="md-data-table__thead">
              <ng-container
                *ngTemplateOutlet="dt.headerTemplate; context {$implicit: columns}">
              </ng-container>
            </thead>

            <tbody class="md-data-table__tbody">
              <ng-template
                ngFor let-rowData let-rowIndex="index"
                [ngForOf]="dt.data"
                [ngForTrackBy]="dt.rowTrackBy"
              >
              </ng-template>
            </tbody>
          </table>

        </div>
    </div>

    <div #scrollBody class="md-data-table__scrollable--body">

        <table
          #scrollTable
          [ngClass]="{'md-data-table__scrollable--body-table': true, 'md-data-table__scrollable--virtual-table': dt.virtualScroll}"
          [class]="dt.tableClass"
          [ngStyle]="dt.tableStyle"
        >

          <ng-container
            *ngTemplateOutlet="dt.colGroupTemplate; context {$implicit: columns}">
          </ng-container>

          <tbody
            class="md-data-table__tbody"
            [mdBodyColumns]="columns"
            [bodyTemplate]="dt.bodyTemplate">
          </tbody>
        </table>


        <table
          #loadingTable
          *ngIf="dt.virtualScroll"
          [ngClass]="
            {'md-data-table__scrollable--body-table md-data-table__scrollable--loading-table': true,
            'md-data-table__scrollable--virtual-table': dt.virtualScroll
            }"
        >

          <tbody class="md-data-table__tbody ">

            <md-spinner
              class="md-data-table__spinner"
              [ngStyle]="{ height: scrollHeight }">
            </md-spinner>

           </tbody>

        </table>

        <div
          #virtualScroller
          class="md-data-table__scrollable--virtual-scroller"
          *ngIf="dt.virtualScroll">
        </div>
    </div>
  `
})


export class ScrollComponent implements AfterViewInit, OnDestroy, AfterViewChecked {

  // tslint:disable-next-line: no-input-rename
  @Input('mdScrollView') columns;

  @ViewChild('scrollHeader') scrollHeaderViewChild: ElementRef;
  @ViewChild('scrollHeaderBox') scrollHeaderBoxViewChild: ElementRef;
  @ViewChild('scrollBody') scrollBodyViewChild: ElementRef;
  @ViewChild('scrollTable') scrollTableViewChild: ElementRef;
  @ViewChild('loadingTable') scrollLoadingTableViewChild: ElementRef;
  @ViewChild('virtualScroller') virtualScrollerViewChild: ElementRef;

  headerScrollListener: Function;
  bodyScrollListener: Function;
  siblingBody: Element;
  scrollableSiblingBody: Element;
  _scrollHeight: string;
  subscription: Subscription;
  dataCountSubscription: Subscription;
  initialized: boolean;
  preventBodyScrollPropagation: boolean;
  page: number = 0;


  constructor(public dt: DataTableComponent, public el: ElementRef, public zone: NgZone) {
    this.subscription = this.dt.tableService.dataSource$.subscribe(() => {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.alignScrollBar();

          if (this.scrollLoadingTableViewChild && this.scrollLoadingTableViewChild.nativeElement) {
            this.scrollLoadingTableViewChild.nativeElement.style.display = 'none';
          }
        }, 50);
      });
    });

    if (this.dt.virtualScroll) {
        this.dataCountSubscription = this.dt.tableService.dataCountSource$.subscribe(() => {
          this.zone.runOutsideAngular(() => {
            setTimeout(() => {
              this.setVirtualScrollerHeight();
            }, 50);
          });
        });
    }

    this.initialized = false;
   }

  @Input() get scrollHeight(): string {
    return this._scrollHeight;
  }
  set scrollHeight(val: string) {
    this._scrollHeight = val;
    this.setScrollHeight();
  }

  ngAfterViewChecked() {
    if ( !this.initialized && this.el.nativeElement.offsetParent ) {
      this.alignScrollBar();
      this.setScrollHeight();
      this.initialized = true;
    }
  }

  ngAfterViewInit() {
    const view = this.el.nativeElement.previousElementSibling;

    if (view) {
      this.siblingBody = Handler.findSingle(view, '.md-data-table__scrollable--body');
    }

    this.bindEvents();
    this.setScrollHeight();
    this.alignScrollBar();

    if (this.dt.virtualScroll) {

      this.setVirtualScrollerHeight();

      if (this.scrollLoadingTableViewChild && this.scrollLoadingTableViewChild.nativeElement) {
        this.scrollLoadingTableViewChild.nativeElement.style.display = 'table';
      }
    }
  }

  bindEvents() {
    this.zone.runOutsideAngular(() => {

      if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
        this.headerScrollListener = this.onHeaderScroll.bind(this);
        this.scrollHeaderViewChild.nativeElement.addEventListener('scroll', this.headerScrollListener);
      }

      this.bodyScrollListener = this.onBodyScroll.bind(this);
      this.scrollBodyViewChild.nativeElement.addEventListener('scroll', this.bodyScrollListener);
    });
  }

  unbindEvents() {
    if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
      this.scrollHeaderViewChild.nativeElement.removeEventListener('scroll', this.headerScrollListener);
    }

    this.scrollBodyViewChild.nativeElement.removeEventListener('scroll', this.bodyScrollListener);
  }

  onHeaderScroll(event) {
    const scrollLeft = this.scrollHeaderViewChild.nativeElement.scrollLeft;

    this.scrollBodyViewChild.nativeElement.scrollLeft = scrollLeft;

    this.preventBodyScrollPropagation = true;
  }

  onBodyScroll(event) {

    if (this.preventBodyScrollPropagation) {
      this.preventBodyScrollPropagation = false;
      return;
    }

    if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
      this.scrollHeaderBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
    }

    if (this.siblingBody) {
      this.siblingBody.scrollTop = this.scrollBodyViewChild.nativeElement.scrollTop;
    }

  if (this.dt.virtualScroll) {
      const viewport = Handler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
      const tableHeight = Handler.getOuterHeight(this.scrollTableViewChild.nativeElement);
      const pageHeight = this.dt.virtualRowHeight * this.dt.numberOfRowsToLoad;
      const virtualTableHeight = Handler.getOuterHeight(this.virtualScrollerViewChild.nativeElement);
      const pageCount = (virtualTableHeight / pageHeight) || 1;
      const scrollBodyTop = this.scrollTableViewChild.nativeElement.style.top || '0';

      // if at end of scroll
      if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
        const page = Math.floor(
          (this.scrollBodyViewChild.nativeElement.scrollTop * pageCount) / (this.scrollBodyViewChild.nativeElement.scrollHeight)
          ) + 1;

        this.dt.handleVirtualScroll({
          page: page,
          callback: () => {

            if (this.scrollLoadingTableViewChild && this.scrollLoadingTableViewChild.nativeElement) {
              this.scrollLoadingTableViewChild.nativeElement.style.display = 'none';
            }

            if (this.siblingBody) {
              (<HTMLElement> this.siblingBody.children[0]).style.top = this.scrollTableViewChild.nativeElement.style.top;
            }
          }
        });
      }
    }
  }

  setScrollHeight() {
    if (this.scrollHeight && this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
      if (this.scrollHeight.indexOf('%') !== -1) {
        let relativeHeight;
        this.scrollBodyViewChild.nativeElement.style.visibility = 'hidden';
        this.scrollBodyViewChild.nativeElement.style.height = '100px';
        const containerHeight = Handler.getOuterHeight(this.dt.el.nativeElement.children[0]);

        relativeHeight = Handler.getOuterHeight(this.dt.el.nativeElement.parentElement) * parseInt(this.scrollHeight, 10) / 100;

        const staticHeight = containerHeight - 100; // total height of everything

        const scrollBodyHeight = (relativeHeight - staticHeight);


        this.scrollBodyViewChild.nativeElement.style.height = 'auto';
        this.scrollBodyViewChild.nativeElement.style.maxHeight = scrollBodyHeight  + 'px';
        this.scrollBodyViewChild.nativeElement.style.visibility = 'visible';
      } else {

        this.scrollBodyViewChild.nativeElement.style.maxHeight = this.scrollHeight;
      }
    }
  }

  setVirtualScrollerHeight() {
    if (this.virtualScrollerViewChild.nativeElement) {
      this.virtualScrollerViewChild.nativeElement.style.height = (this.dt.dataCount) * this.dt.virtualRowHeight + 'px';
    }
  }

  hasVerticalOverflow() {
    return Handler.getOuterHeight(this.scrollTableViewChild.nativeElement) > Handler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
  }

  alignScrollBar() {
    const scrollBarWidth = this.hasVerticalOverflow() ? Handler.calculateScrollbarWidth() : 0;
    this.scrollHeaderBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';

    this.initialized = false;
  }

  ngOnDestroy() {
    this.unbindEvents();
    this.siblingBody = null;

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.dataCountSubscription) {
      this.dataCountSubscription.unsubscribe();
    }
    this.initialized = false;
  }
}
