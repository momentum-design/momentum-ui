import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DatePickerService } from './date-picker.service';

@Component({
  selector: 'cui-date-picker-week',
  template: `
    <cui-date-picker-day *ngFor='let _day of days' [day]='_day' [month]='month'></cui-date-picker-day>
  `,
  styles: []
})
export class DatePickerWeekComponent implements OnInit {

  /** @prop Required day that the DatePickerDay displays */
  @Input() public day:any;
  @Input() public month:any;

  public days=[];

  @HostBinding('class') classes:string = 'cui-datepicker__week';

  constructor(
    private datePickerService:DatePickerService
  ) {

  }

  ngOnInit() {
    this.days= this.datePickerService.getDaysInWeek(this.day);
  }

}
