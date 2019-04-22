import { Component, OnInit, Input } from '@angular/core';
import { DatePickerService } from './date-picker.service';

@Component({
  selector: 'md-date-picker-week',
  template: `
    <md-date-picker-day *ngFor='let _day of days' [day]='_day' [month]='month'></md-date-picker-day>
  `,
  styles: [],
  host: {
    class: 'md-datepicker__week'
  }
})
export class DatePickerWeekComponent implements OnInit {

  /** @prop Required day that the DatePickerDay displays */
  @Input() public day: any;
  @Input() public month: any;

  public days = [];

  constructor(
    private datePickerService: DatePickerService
  ) {

  }

  ngOnInit() {
    this.days = this.datePickerService.getDaysInWeek(this.day);
  }

}
