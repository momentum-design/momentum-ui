import { Component, OnInit } from '@angular/core';
import { DatePickerService } from './date-picker.service';

@Component({
  selector: 'md-date-picker-month',
  template: `
    <md-date-picker-week *ngFor='let _day of weeks' [day]='_day' [month]='month' ></md-date-picker-week>
  `,
  styles: [
    '.md-datepicker__week{ display: block !important; }',
    ':host{display: block !important;}'
  ],
  host: {
    class: 'md-datepicker__month'
  }
})
export class DatePickerMonthComponent implements OnInit {

  public weeks = [];
  public month: any;

  constructor(
    private datePickerService: DatePickerService
  ) {
    this.datePickerService.viewed$.subscribe(date => {
      this.month = this.datePickerService.getMonth(date);
      this.initWeeks(date);
    });
  }

  ngOnInit() {

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
