import { Injectable } from '@angular/core';
import * as moment_ from 'moment';
import { Subject } from 'rxjs';
const moment = moment_;

export declare type UnitType = 'h' | 'm' | 'pre';
export declare type MinuteIntervalType = 1 | 5 | 15 | 30 | 60;

@Injectable()
export class TimePickerService {

  public dayChange = 0;
  private regIsHM = /^h|m$/i;
  private regIsHMValue = /^\d*\d$/;
  private regIsPre = /^pre$/i;
  private regIsPreValue = /^am|pm$/i;

  public config = {
    time: {
      format: 'HH:mm'
    },
    m: {
      interval: 1,
      intervalUnit: 'm',
      format: 'mm'
    },
    h: {
      interval: 1,
      intervalUnit: 'h',
      format: 'HH'
    },
    pre: {
      interval: 12,
      intervalUnit: 'h',
      format: 'A'
    }
  };

  public selectedTime: any = moment();
  private selected = new Subject<any>();
  selected$ = this.selected.asObservable();

  public militaryTime: boolean = false;
  private military = new Subject<boolean>();
  military$ = this.military.asObservable();

  private isShow = new Subject<boolean>();
  isShow$ = this.isShow.asObservable();

  constructor() {
    this.selected$.subscribe(v => {
      this.selectedTime = v;
    });
    this.military$.subscribe(v => {
      this.militaryTime = v;
      const conf = this.config;
      if (v) {
        conf.h.format = 'HH';
        conf.time.format = 'HH:mm';
      } else {
        conf.h.format = 'hh';
        conf.time.format = 'LT';
      }
    });
  }

  public show(isOpen: boolean) {
    this.isShow.next(isOpen);
  }

  public validTime = (unit, v) => {
    return this.regIsHM.test(unit) && this.regIsHMValue.test(v);
  }

  public validPre = (unit, v) => {
    return this.regIsPre.test(unit) && this.regIsPreValue.test(v);
  }

  public getTimeString = () => {
    return this.selectedTime.format(this.config.time.format);
  }

  public initTime = (v) => {
    this.selected.next(moment(v));
  }

  public setMilitary = (v) => {
    this.military.next(v);
  }

  public setMinuteInterval = (v) => {
    this.config.m.interval = v;
  }

  public getUnitText = (unit) => {
    return this.selectedTime.format(this.config[unit].format);
  }

  public changeTimeByInterval = (unit, multiplier) => {
    const conf = this.config[unit];
    this.changeTime(conf.intervalUnit, conf.interval * multiplier);
  }

  public changeTime = (unit, change) => {
    const newTime = moment(this.selectedTime).add(change, unit);
    const startDay = moment().startOf('day');

    if (change > 0) {
      if (newTime.clone().startOf('day').isAfter(startDay)) {
        newTime.add(-1, 'day');
        this.dayChange = 1;
      }
    } else {
      if (newTime.clone().startOf('day').isAfter(startDay)) {
        newTime.add(1, 'day');
        this.dayChange = -1;
      }
    }
    this.selected.next(newTime);
  }

  public setTime = (
    hour = this.getUnitText('h'),
    minute = this.getUnitText('m'),
    pre = this.getUnitText('pre')
  ) => {
    const meridianHour =
      pre === 'PM' && parseInt(hour, 10) < 12
        ? parseInt(hour, 10) + 12
        : pre === 'AM' && parseInt(hour, 10) === 12 ? 0 : hour;
    this.dayChange = 0;
    this.selected.next(this.selectedTime.clone().hour(meridianHour).minute(minute));
  }

  public setTimeByUnit = (unit, value) => {
    const maxHour = this.military ? 24 : 13;
    if (unit === 'm' && value > -1 && value < 60) {
      this.setTime(undefined, value, undefined);
    } else if (unit === 'h' && value > -1 && value < maxHour) {
      this.setTime(value, undefined, undefined);
    } else if (unit === 'pre') {
      this.setTime(undefined, undefined, value);
    }
  }
}
