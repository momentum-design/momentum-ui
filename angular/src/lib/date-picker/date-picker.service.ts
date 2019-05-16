import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  addDays,
  subtractDays,
  addMonths,
  getLocaleData,
  getStartOfWeek,
  getStartOfMonth,
  getWeekdayMinInLocale,
  isSameMonth,
  isSameDay,
  localizeDate,
  now,
  isDayDisabled,
  shouldNextMonthDisable,
  shouldPrevMonthDisable,
  subtractMonths,
  getDate,
  addWeeks,
  getMonth
} from '../utils/dateUtils';
let moment = require('moment');
if ('default' in moment) {
  moment = moment['default'];
}

@Injectable()

export class DatePickerService {

  public selectedDate: any = moment();
  public focusedDate: any = moment();
  public viewedDate: any = moment();

  public locale: string;
  public maxDate: any;
  public minDate: any;
  public monthFormat: string;
  public nextArialLabel: string;
  public previousArialLabel: string;
  public config: any;

  public weekDaysMap = [0, 1, 2, 3, 4, 5, 6];

  private selected = new Subject<any>();
  selected$ = this.selected.asObservable();

  private focused = new Subject<any>();
  focused$ = this.focused.asObservable();

  private viewed = new Subject<any>();
  viewed$ = this.viewed.asObservable();

  private viewMonthChange = new Subject<any>();
  viewMonthChange$ = this.viewMonthChange.asObservable();

  private isShowDatepicker = new Subject<boolean>();
  isShowDatepicker$ = this.isShowDatepicker.asObservable();

  private constStartOfWeek = getStartOfWeek(moment());

  constructor() {
    this.selected$.subscribe(o => {
      this.selectedDate = o;
      this.focus(o);
    });
    this.focused$.subscribe(o => {
      this.focusedDate = o;
      this.view(o);
    });
    this.viewed$.subscribe(o => {
      if (this.viewedDate && !isSameMonth(this.viewedDate, o)) {
        this.viewMonthChange.next(this.getMonth(o));
      }
      this.viewedDate = o;
    });
  }

  public setOpenStatus(isOpen: boolean) {
    this.isShowDatepicker.next(isOpen);
  }

  public initConfig = (config) => {
    for (const n in config) {
      if (config.hasOwnProperty(n)) {
        this[n] = config[n];
      }
    }
    this.config = config;
  }

  public select = (d) => {
    this.selected.next(d);
  }

  public focus = (d: any, offset?: number) => {
    let _d = d.clone();
    if (offset !== undefined) {
      if (offset >= 0) {
        _d = addDays(_d, offset);
      } else {
        _d = subtractDays(_d, -offset);
      }
    }
    this.focused.next(_d);
  }

  public view = (d) => {
    this.viewed.next(d);
  }

  public isSameDay = (d1, d2) => {
    return isSameDay(d1, d2);
  }

  // calendar

  public getMonthName = date => {
    return localizeDate(date, this.locale).format(this.monthFormat);
  }

  public shouldNextMonthDisable = date => {
    return shouldNextMonthDisable(date, this.maxDate);
  }

  public shouldPrevMonthDisable = date => {
    return shouldPrevMonthDisable(date, this.maxDate);
  }

  public getWeekDayName = offset => {
    const day = addDays(localizeDate(this.constStartOfWeek, this.locale), offset);
    const localeData = getLocaleData(day);
    return getWeekdayMinInLocale(localeData, day);
  }

  // month

  public getMonth = day => {
    return getMonth(day);
  }

  public getStartWeekOfMonth = day => {
    return getStartOfWeek(getStartOfMonth(day.clone()));
  }

  public getNextWeekStart = day => {
    return addWeeks(day.clone(), 1);
  }

  public isSameMonth = (d1, d2) => {
    return isSameMonth(d1, d2);
  }

  public viewNextMonth = () => {
    this.view(addMonths(this.viewedDate.clone(), 1));
  }

  public viewPreMonth = () => {
    this.view(subtractMonths(this.viewedDate.clone(), 1));
  }

  // week

  public getDaysInWeek = day => {
    const days = [];
    const startDay = getStartOfWeek(day.clone());
    for (const n in this.weekDaysMap) {
      if (this.weekDaysMap.hasOwnProperty(n)) {
        days.push(addDays(startDay.clone(), n));
      }
    }
    return days;
  }

  // day

  public getDate = day => {
    return getDate(day);
  }

  public isToday = (day) => {
    return isSameDay(day, now(null));
  }

  public isSelected = (day) => {
    return isSameDay(day, this.selectedDate);
  }

  public isFocus = (day) => {
    return isSameDay(day, this.focusedDate);
  }

  public isOutsideMonth = (day, month) => {
    return month !== getMonth(day);
  }

  public isDayDisabled = (day) => {
    return isDayDisabled(day, this.config);
  }
}
