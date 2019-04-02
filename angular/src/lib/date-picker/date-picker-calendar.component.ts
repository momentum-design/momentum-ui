import { Component, OnInit } from '@angular/core';
import { DatePickerService } from './date-picker.service';

@Component({
  selector: 'cui-date-picker-calendar',
  template: `
  <div class='cui-datepicker__header'>
    <div class='cui-datepicker__navigation'>
      <div class='cui-datepicker__navigation--current-month'>
        {{ monthName }}
      </div>
      <div class='cui-datepicker__navigation--buttons'>
        <cui-icon name='arrow-left_16'
          [attr.disabled]='this.allPrevDaysDisabled'
          [ariaLabel]='previousArialLabel'
        (click)='onClickPre($event)'>
        </cui-icon>
        <cui-icon name='arrow-right_16'
          [attr.disabled]='this.allNextDaysDisabled'
          [ariaLabel]='nextArialLabel'
          (click)='onClickNext($event)'>
        </cui-icon>
      </div>
    </div>
    <div class='cui-datepicker__day--names'>
      <div *ngFor='let offset of offsets' class='cui-datepicker__day--name'>
        {{ getWeekDayName(offset) }}
      </div>
    </div>
  </div>
  <cui-date-picker-month></cui-date-picker-month>
  `,
  styles: [
    ':host{display: block !important;}'
  ],
  host: {
    class: 'cui-datepicker__month-container'
  }
})
export class DatePickerCalendarComponent implements OnInit {

  public monthName: string;
  public allPrevDaysDisabled: boolean;
  public allNextDaysDisabled: boolean;
  public previousArialLabel: string;
  public nextArialLabel: string;
  public offsets = [0, 1, 2, 3, 4, 5, 6];
  public today;

  constructor(
    private datePickerService: DatePickerService
  ) {
    const s = this.datePickerService;
    this.previousArialLabel = s.previousArialLabel;
    this.nextArialLabel = s.nextArialLabel;
    this.today = s.viewedDate;
    s.viewed$.subscribe(date => {
      this.monthName = s.getMonthName(date);
      this.allNextDaysDisabled = s.shouldNextMonthDisable(date);
      this.allPrevDaysDisabled = s.shouldPrevMonthDisable(date);
    });
  }

  ngOnInit() {

  }

  public getWeekDayName = offset => {
    return this.datePickerService.getWeekDayName(offset);
  }

  public onClickPre = (e) => {
    this.datePickerService.viewPreMonth();
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  public onClickNext = (e) => {
    this.datePickerService.viewNextMonth();
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

}
