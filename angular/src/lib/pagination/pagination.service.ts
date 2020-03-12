import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class PaginationService implements OnDestroy {
  public href: string = '';
  public hrefReplaceReg: string | RegExp = '$page$';

  public currentPage: number;
  public focusPage: any;
  public totalPage: number;

  private current = new Subject<number>();
  private focused = new Subject<any>();
  private total = new Subject<number>();
  private unsubscribe$ = new Subject();

  current$ = this.current.asObservable();
  focused$ = this.focused.asObservable();
  total$ = this.total.asObservable();

  constructor(private sanitizer: DomSanitizer) {
    this.current$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((v) => {
      this.currentPage = v;
    });
    this.focused$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((v) => {
      this.focusPage = v;
    });
    this.total$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((v) => {
      this.totalPage = v;
    });
  }

  initConfig(href, hrefReplaceReg, totalPage) {
    this.href = href;
    this.hrefReplaceReg = hrefReplaceReg;
    this.totalPage = totalPage;
  }

  isClickable(index) {
    return index !== this.currentPage && index > 0 && index <= this.totalPage;
  }

  isFirstOrLastNow() {
    return this.currentPage === 0 || this.currentPage === this.totalPage;
  }

  isCurrent(index) {
    return this.currentPage === index;
  }

  isCurrentFirst() {
    return this.currentPage === 1;
  }

  isCurrentLast() {
    return this.currentPage === this.totalPage;
  }

  select(index) {
    if (this.isClickable(index)) {
      this.current.next(index);
    }
  }

  selectNext() {
    this.select(this.currentPage + 1);
  }

  selectPrevious() {
    this.select(this.currentPage - 1);
  }

  focus(index) {
    if (index !== this.focusPage) {
      this.focused.next(index);
    }
  }

  updateTotal(total) {
    this.total.next(total);
    if (this.totalPage < this.currentPage) {
      this.current.next(total);
    }
  }

  public getHref = (index): String | SafeUrl => {
    if (this.href !== '' && this.href) {
      return this.href.replace(this.hrefReplaceReg, index);
    } else {
      return this.sanitizer.bypassSecurityTrustUrl('javascript:void(0)');
    }
  }

  public focusInList = (list, offset) => {
    let index = list.indexOf(this.focusPage || this.currentPage);
    const lastIndex = list.length - 1;
    if (lastIndex > -1) {
      if (index === -1) {
        index = 0;
      }
      if (offset > 0) {
        index = Math.min(lastIndex, index + offset);
      } else {
        index = Math.max(0, index + offset);
      }
      this.focus(list[index]);
    }
  }

  public selectfocus = () => {
    if (this.focusPage === 'previous') {
      this.selectPrevious();
    } else if (this.focusPage === 'next') {
      this.selectNext();
    } else {
      this.select(this.focusPage);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
