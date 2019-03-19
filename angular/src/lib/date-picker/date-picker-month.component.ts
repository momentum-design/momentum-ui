import { Component, OnInit, HostBinding } from '@angular/core';
import { DatePickerService } from './date-picker.service';

@Component({
  selector: 'cui-date-picker-month',
  template: `
    <cui-date-picker-week *ngFor='let _day of weeks' [day]='_day' [month]='month' ></cui-date-picker-week>
  `,
  styles: [
    '.cui-datepicker__week{ display: block !important; }'
  ]
})
export class DatePickerMonthComponent implements OnInit {

  public weeks=[];
  public month:any;

  @HostBinding('class') classes = 'cui-datepicker__month';
  
  constructor(
    private datePickerService: DatePickerService
  ) { 
    this.datePickerService.viewed$.subscribe( date => {
      this.month = this.datePickerService.getMonth(date);
      this.initWeeks(date);
    });    
  }

  ngOnInit() {

  }

  private initWeeks = (day)=>{
    let _weeks=[];
    let currentWeekStart = this.datePickerService.getStartWeekOfMonth(day);
    do {
      _weeks.push(currentWeekStart);
      currentWeekStart = this.datePickerService.getNextWeekStart(currentWeekStart);
    } while(this.datePickerService.isSameMonth(day,currentWeekStart))
    this.weeks = _weeks;
  }

}
