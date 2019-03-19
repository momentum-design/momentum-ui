import { Component, OnInit, Input, HostBinding, HostListener, ElementRef } from '@angular/core';
import { DatePickerService } from './date-picker.service';

@Component({
  selector: 'cui-date-picker-day',
  template: `
    {{ displayDay }}
  `,
  styles: []
})
export class DatePickerDayComponent implements OnInit {

  /** @prop Required day that the DatePickerDay displays */
  @Input() day: any;
  /** @prop Required month that the DatePickerDay displays */
  @Input() month: any;

  private isDisable = false;
  private isSelected = false;
  private isFocus = false;
  private isToday = false;
  private isOutsideMonth = false;

  public displayDay;

  @HostBinding('class') get classes(): string {
    return 'cui-button'+
    ' cui-button--circle cui-button--28' +
    `${(this.isDisable && ` cui-button--disabled`) || ''}` +
    ' cui-datepicker__day'+
    `${(this.isSelected && ` cui-datepicker__day--selected`) || ''}` +
    `${(this.isFocus && ` cui-datepicker__day--focus`) || ''}` +
    `${(this.isToday && ` cui-datepicker__day--today`) || ''}` +
    `${(this.isOutsideMonth && ` cui-datepicker__day--outside-month`) || ''}` +
    ``;
  };

  @HostBinding('attr.ariaLabel') get myAriaLabel(): string {
    return '';
  }

  @HostBinding('attr.aria-selected') get myAriaSelect(): boolean {
    return false;
  }

  @HostBinding('attr.tabIndex') myTabIndex:number = -1;

  @HostListener('click', ['$event']) onclick($event) {
    this.datePickerService.select(this.day);
  }

  constructor(
    private datePickerService:DatePickerService,
    private el:ElementRef
  ) { 
    let s = this.datePickerService;
    s.focused$.subscribe( date => {
      this.checkState();
    });
    s.selected$.subscribe( date => {
      this.checkState();
    });
    s.viewed$.subscribe( date => {
      this.checkState();
    });
  }

  ngOnInit() {
    this.displayDay = this.datePickerService.getDate(this.day);
    this.checkState();
  }

  private checkState = () => {
    let s = this.datePickerService,
      d= this.day;
    this.isDisable = s.isDayDisabled(d);
    this.isSelected = s.isSelected(d);
    this.isFocus = s.isFocus(d);
    this.isToday = s.isToday(d);
    this.isOutsideMonth = s.isOutsideMonth(d, this.month);    
  }

}
