import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DatePickerService } from './date-picker.service';

@Component({
  selector: 'md-date-picker-month',
  template: `
    <md-date-picker-week *ngFor='let _day of weeks' [day]='_day' [month]='month' ></md-date-picker-week>
  `,
  host: {
    class: 'md-datepicker__month'
  }
})
export class DatePickerMonthComponent implements OnInit {

  public weeks = [];
  public month: any;
  private RegInnerClass = /md-button--circle md-button--28 md-datepicker__day|md-datepicker__week|md-datepicker__month|speicalRangeClass/;

  constructor(
    private datePickerService: DatePickerService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.datePickerService.viewed$.subscribe(date => {
      this.month = this.datePickerService.getMonth(date);
      this.initWeeks(date);
    });
  }

  ngOnInit() {
    if (this.datePickerService.isRange) {
      const root = this.viewContainerRef.element.nativeElement;
      root.addEventListener('mouseleave', (e) => {
        this.handleMouseleave(e);
      });
    }
  }

  public handleMouseleave = (event) => {
    if (this.isNotDayComponent(event.relatedTarget)) {
      this.datePickerService.hover(undefined);
    }
  }

  private isNotDayComponent = (dom) => {
    return !(dom && dom.className && this.RegInnerClass.test(dom.className));
  }

  private initWeeks = (day) => {
    const _weeks = [];
    let currentWeekStart = this.datePickerService.getStartWeekOfMonth(day);
    do {
      _weeks.push(currentWeekStart);
      currentWeekStart = this.datePickerService.getNextWeekStart(currentWeekStart);
    } while (this.datePickerService.isSameMonth(day, currentWeekStart));
    this.weeks = _weeks;
  }

}
