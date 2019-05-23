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
import { AnyTxtRecord } from 'dns';
let moment = require('moment');
if ('default' in moment) {
  moment = moment['default'];
}

@Injectable()

export class DatePickerService {

  public selectedDate: any = moment();
  public focusedDate: any = moment(); // auto focus today
  public viewedDate: any = moment();

  public locale: string;
  public maxDate: any;
  public minDate: any;
  public filterDate: any;
  public monthFormat: string;
  public nextArialLabel: string;
  public previousArialLabel: string;
  public config: any;
  public isRange: false;
  public targetStart: boolean = true;
  public start?: any;
  public end?: any;
  public hoverDate: any;

  public weekDaysMap = [0, 1, 2, 3, 4, 5, 6];
  public nowDate = moment();

  private selected = new Subject<any>();
  selected$ = this.selected.asObservable();

  private focused = new Subject<any>();
  focused$ = this.focused.asObservable();

  private viewed = new Subject<any>();
  viewed$ = this.viewed.asObservable();

  private hovered = new Subject<any>();
  hovered$ = this.hovered.asObservable();

  private startDate = new Subject<any>();
  startDate$ = this.startDate.asObservable();

  private endDate = new Subject<any>();
  endDate$ = this.endDate.asObservable();

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
    this.hovered$.subscribe(o => {
      this.hoverDate = o;
    });
    this.startDate$.subscribe(o => {
      this.start = o;
      if (o) {
        this.minDate = addDays(o.clone(), 1);
        this.focus(o);
      } else {
        this.minDate = undefined;
        this.view(this.end || this.nowDate);
      }
      this.hover(o);
    });
    this.endDate$.subscribe(o => {
      this.end = o;
      if (o) {
        this.maxDate = subtractDays(o.clone(), 1);
        this.focus(o);
      } else {
        this.maxDate = undefined;
        this.view(this.start || this.nowDate);
      }
      this.hover(o);
    });
  }

  public changeTarget(ifStart) {
    this.targetStart = ifStart;
  }

  public getDateRangeString() {
    return (this.start ? this.start : '') + '-' + (this.end ? this.end : '');
  }

  public isDayInRange(day) {
    return !isDayDisabled(day, {
      minDate: this.start ? this.start : this.hoverDate,
      maxDate: this.end ? this.end : this.hoverDate,
      filterDate: this.filterDate
    });
  }

  public isActiveDay(day, op) {
    return !isDayDisabled(day, op);
  }

  public hasEitherRange() {
    return this.start || this.end;
  }

  public hasFinishRange() {
    return this.start && this.end;
  }

  public isStartDay(day) {
    return isSameDay(day, this.start);
  }

  public isEndDay(day) {
    return isSameDay(day, this.end);
  }

  public changeStartDate(v) {
    this.startDate.next(v);
  }

  public changeEndDate(v) {
    this.endDate.next(v);
  }

  // public

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
    if (this.isRange) {
      if (!d || this.isDayInRange(d)) {
        if (this.targetStart) {
          this.startDate.next(d);
        } else {
          this.endDate.next(d);
        }
      }
    } else {
      this.selected.next(d);
    }
  }

  public getNewDayByOffset = (d: any, offset?: number) => {
    if (!d) {
      return d;
    }
    let _d = d.clone();
    if (offset !== undefined) {
      if (offset >= 0) {
        _d = addDays(_d, offset);
      } else {
        _d = subtractDays(_d, -offset);
      }
    }
    return _d;
  }

  public focus = (d: any, offset?: number) => {
    const _d = offset ? this.getNewDayByOffset(d, offset) : d;
    this.focused.next(_d);
  }

  public view = (d) => {
    this.viewed.next(d);
  }

  public hover = (d: any, offset?: number) => {
    const _d = offset ? this.getNewDayByOffset(d, offset) : d;
    this.hovered.next(_d);
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

  public getLocaleData = (d) => {
    return getLocaleData(d);
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
    return isDayDisabled(day, {
      minDate: this.minDate,
      maxDate: this.maxDate,
      filterDate: this.filterDate
    });
  }
}
