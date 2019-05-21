import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy
} from '@angular/core';
import { DataTableComponent } from './data-table.component';

@Directive({
  selector: '[mdResizableColumn]'
})
export class ResizableColumnDirective implements AfterViewInit, OnDestroy {

  resizeHelper: HTMLSpanElement;

  mouseDownListener: any;

  docMouseMoveListener: any;

  docMouseUpListener: any;

  constructor(
    public dt: DataTableComponent,
    public el: ElementRef,
    public zone: NgZone
  ) { }

  ngAfterViewInit() {

    this.el.nativeElement.classList.add('md-data-table__resizable-column');

    // create span for resizer
    this.resizeHelper = document.createElement('span');
    this.resizeHelper.className = 'md-data-table__column-resizer';
    this.el.nativeElement.appendChild(this.resizeHelper);

    this.zone.runOutsideAngular(() => {
      this.mouseDownListener = this.onMouseDown.bind(this);
      this.resizeHelper.addEventListener('mousedown', this.mouseDownListener);
    });

  }

  bindDocEvents() {
    this.zone.runOutsideAngular(() => {
      this.docMouseMoveListener = this.onDocMouseMove.bind(this);
      document.addEventListener('mousemove', this.docMouseMoveListener);

      this.docMouseUpListener = this.onDocMouseUp.bind(this);
      document.addEventListener('mouseup', this.docMouseUpListener);
    });
  }

  unbindDocEvents() {
    if (this.docMouseMoveListener) {
      document.removeEventListener('mousemove', this.docMouseMoveListener);
      this.docMouseMoveListener = null;
    }

    if (this.docMouseUpListener) {
      document.removeEventListener('mouseup', this.docMouseUpListener);
      this.docMouseUpListener = null;
    }
  }

  onMouseDown(event: Event) {
    this.dt.onColumnResizeStart(event);
    this.bindDocEvents();
  }

  onDocMouseMove(event: Event) {
    this.dt.onColumnResize(event);
  }

  onDocMouseUp(event: Event) {
    this.dt.onColumnResizeEnd(event, this.el.nativeElement);
    this.unbindDocEvents();
  }

  ngOnDestroy() {
    if (this.mouseDownListener) {
      this.resizeHelper.removeEventListener('mousedown', this.mouseDownListener);
    }
    this.unbindDocEvents();
  }
}
