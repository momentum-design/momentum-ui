import { Component, OnInit, HostBinding , HostListener} from '@angular/core';
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
        <cui-icon name='arrow-left_16' [attr.disabled]='this.allPrevDaysDisabled' [ariaLabel]='previousArialLabel' (click)='onClickPre($event)'></cui-icon>
        <cui-icon name='arrow-right_16' [attr.disabled]='this.allNextDaysDisabled' [ariaLabel]='nextArialLabel' (click)='onClickNext($event)'></cui-icon>
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
    '.cui-datepicker__month{ display: block !important; }'
  ]
})
export class DatePickerCalendarComponent implements OnInit {

  public monthName:string;
  public allPrevDaysDisabled:boolean;
  public allNextDaysDisabled:boolean;
  public previousArialLabel:string;
  public nextArialLabel:string;
  public offsets = [0,1,2,3,4,5,6];
  public today;

  @HostBinding('class') classes = 'cui-datepicker__month-container';

  //@HostListener('keyup', ['$event']) moveFocus($event) {
  //  this.onPress($event);
  //}


  constructor(
    private datePickerService: DatePickerService
  ) { 
    var s = this.datePickerService;
    this.previousArialLabel =  s.previousArialLabel;
    this.nextArialLabel = s.nextArialLabel;
    this.today = s.viewedDate;
    s.viewed$.subscribe( date => {
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

  public onClickNext = (e) =>{
    this.datePickerService.viewNextMonth();
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

}
