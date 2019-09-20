/** @component date-range-picker-calendar */
import * as moment from 'moment';
import { isUndefined } from 'lodash';

interface IDay {
  day: number | string;
  month: number | string;
  year: number | string;
  enabled?: boolean;
  active?: boolean;
  inRange?: boolean;
}

interface IWeek {
  days: IDay[];
}

export class DateRangePickerCalendarController implements ng.IComponentController {
  public static $inject = ['$scope'];
  private readonly DATE = 'date';
  private readonly DEFAULT_DATE_VALUE = 'MMM YYYY';
  private readonly DEFAULT_FORMAT = 'YYYY-MM-DD';
  private readonly DEFAULT_VIEW_FORMAT = 'MMMM DD, YYYY';
  private readonly DEFAULT_LOCALE = 'en';
  private readonly MONTH = 'month';
  public selectedDate: any;
  public selectedMoment: moment.Moment;
  public firstEnabledDate?: string;
  public lastEnabledDate?: string;
  public disabledTooltipText: string;
  public placeholder: string
  public required: boolean;
  public disabled: boolean;
  public showYearArrow?: boolean;
  public id?: string;
  public class?: string;
  public setDate: any;
  public onChangeFn?: Function;
  public weeks: IWeek[] = [];
  public dayNames: string[] = [];
  public viewValue?: any;
  public dateValue?: any;
  public aboveButton: boolean = false;
  public datePickerForm: ng.IFormController;
  private _format?: string;
  private _locale?: string;
  private _viewFormat?: string;
  private classList: string[] = ['md-datepicker', 'md-datepicker-input', 'icon-cal'];

  private viewMoment: moment.Moment;

  constructor (
    private $scope: ng.IScope,
  ) {}

  public $onInit() {
    moment.locale(this.locale);
    this.generateDayNames();
    this.setDates(this.selectedDate);
    this.generateCalendar(this.viewMoment);

    if (!isUndefined(this.id)) {
      this.classList.push(this.id);
    }
  }

  public $onChanges(changes) {
    const { selectedDate, firstEnabledDate, lastEnabledDate } = changes;
    if (selectedDate && !isUndefined(selectedDate.currentValue) && selectedDate && selectedDate.currentValue !== selectedDate.previousValue) {
      this.setDates(selectedDate.currentValue);
    }
    if (this.viewMoment && firstEnabledDate && !isUndefined(firstEnabledDate.currentValue) && firstEnabledDate.currentValue !== firstEnabledDate.previousValue) {
      this.generateCalendar(this.viewMoment);
    }
    if (this.viewMoment && lastEnabledDate && !isUndefined(lastEnabledDate.currentValue) && lastEnabledDate.currentValue !== lastEnabledDate.previousValue) {
      this.generateCalendar(this.viewMoment);
    }
  }

  public get format(): string {
    return this._format ? this._format : this.DEFAULT_FORMAT;
  }

  public set format(format) {
    this._format = format;
  }

  public get locale(): string {
    return this._locale ? this._locale : this.DEFAULT_LOCALE;;
  }

  public set locale(locale) {
    this._locale = locale;
  }

  public get viewFormat(): string {
    return this._viewFormat ? this._viewFormat : this.DEFAULT_VIEW_FORMAT;
  }

  public set viewFormat(viewFormat) {
    this._viewFormat = viewFormat;
  }

  public hasClearButton(): boolean {
    return isUndefined(this.required) ? false : this.required;
  }

  public prevYear() {
    this.viewMoment.subtract(1, 'y');
    this.generateCalendar(this.viewMoment);
  }

  public prevMonth() {
    this.viewMoment.subtract(1, 'M');
    this.generateCalendar(this.viewMoment);
  }

  public nextMonth = () => {
    this.viewMoment.add(1, 'M');
    this.generateCalendar(this.viewMoment);
  }

  public nextYear() {
    this.viewMoment.add(1, 'y');
    this.generateCalendar(this.viewMoment);
  }

  public selectDate(event: Event, date: any) {
    event.preventDefault();
    if (!date.active) {
      return;
    }

    this.selectedMoment = moment(date.day + '.' + (date.month + 1) + '.' + date.year, 'DD.MM.YYYY');
    this.setDates(this.selectedMoment);
    this.generateCalendar(this.viewMoment);
    if (this.onChangeFn && typeof this.onChangeFn === 'function') {
      this.onChangeFn({
        date: this.selectedMoment,
      });
    }
  }

  public isSelectedDay(date: any) {
    if (this.selectedMoment) {
      if ((this.selectedMoment.year() === date.year)
        && (this.selectedMoment.month() === date.month)
        && (this.selectedMoment.date() === date.day)) {
        return true;
      }
    }
    return false;
  }

  public isToday(date) {
    return ((moment().month() === date.month) && (moment().date() === date.day) && (moment().year() === date.year));
  }

  private generateCalendar(date: any) {
    let firstWeekDay = date.set(this.DATE, 1).day(),
      month = date.month(),
      year = date.year(),
      lastDayOfMonth = date.endOf(this.MONTH).date(),
      lastWeekDay = date.day();

    let dateClone = moment(date);
    let preMonthLastDay = dateClone.subtract(1, 'M').endOf(this.MONTH).date();

    let extraDayCtr = 0;
    extraDayCtr = 6 - (lastWeekDay + 1);

    this.dateValue = date.format(this.DEFAULT_DATE_VALUE);
    let days: IDay[] = [];

    let isDateInBounds = (day: number, month: number, year: number) => {
      if (!this.firstEnabledDate && ! this.lastEnabledDate) {
        return true;
      }
      let date = moment([year, month, day]);
      let firstEnabled = moment(this.firstEnabledDate, this.format);
      let lastEnabled = moment(this.lastEnabledDate, this.format);
      let isBefore = firstEnabled.isValid() && date.isBefore(firstEnabled);
      let isAfter = lastEnabled.isValid() && date.isAfter(lastEnabled);
      if (isBefore || isAfter) {
        return false;
      }

      return true;
    };

    let isSameDate = (date1: moment.Moment, date2: moment.Moment) => {
      return date1.diff(date2, 'days') === 0;
    };

    let isDateInRange = (day: number, month: number, year: number) => {
      let dateMoment = moment([year, month, day]);
      let firstEnabled = moment(this.firstEnabledDate, this.format);
      let lastEnabled = moment(this.lastEnabledDate, this.format);
      if (this.firstEnabledDate
        && (dateMoment.isAfter(firstEnabled) || isSameDate(dateMoment, firstEnabled))
        && dateMoment.isBefore(this.selectedMoment)) {
        return true;
      }
      if (this.lastEnabledDate
        && (dateMoment.isBefore(lastEnabled) || isSameDate(dateMoment, lastEnabled))
        && dateMoment.isAfter(this.selectedMoment)) {
        return true;
      }
      return false;
    };

    let j = 1;
    let k = 1;

    for (let i = 0; i <= lastDayOfMonth + firstWeekDay + extraDayCtr; i += 1) {
      if (i >= firstWeekDay && k <= lastDayOfMonth) {
        days.push({ day: k, month: month, year: year, enabled: true, active: isDateInBounds(k, month, year), inRange: isDateInRange(k, month, year) });
        k++;
      } else if (i <= firstWeekDay) {
        days.push({
          day: preMonthLastDay - (firstWeekDay - 1) + i,
          month: month - 1,
          year: year,
          enabled: false,
          inRange: isDateInRange(k, month, year),
        });
      } else {
        days.push({ day: j, month: month + 1, year: year, enabled: false, inRange: isDateInRange(k, month, year) });
        j++;
      }
    }

    this.weeks = [{
      days: [],
    }];
    days.forEach((day) => {
      const week = this.weeks.length - 1;
      if (this.weeks[week].days.length < 7) {
        this.weeks[week].days.push(day);
      } else {
        this.weeks.push({
          days: [day],
        });
      }
    });
  }

  private generateDayNames() {
    let date = moment().day(-7);  //gets the last sunday
    for (let i = 0; i < 7; i += 1) {
      this.dayNames.push(date.format('dd'));
      date.add('1', 'd');
    }
  }

  private setDates(selectedDate: moment.Moment) {
    this.selectedMoment = moment(selectedDate, this.format);
    if (selectedDate && this.selectedMoment.isValid()) {
      this.viewMoment = this.selectedMoment.clone();
    } else {
      this.viewMoment= moment();
    }
  }
}

export class DateRangePickerCalendarComponent implements ng.IComponentOptions {
  public controller = DateRangePickerCalendarController;
  public template = `
    <div class="md-datepicker__month-container {{ $ctrl.class }}">
      <div class="md-datepicker__header">
        <div class="md-datepicker__navigation">
          <div class="md-datepicker__navigation--current-month">{{ $ctrl.dateValue }}</div>

          <div class="md-datepicker__navigation--buttons">
            <button class="md-button md-button--none" ng-if="$ctrl.showYearArrow" ng-click="$ctrl.prevYear()">
              <i class="icon icon-arrow-circle-left_12"></i>
            </button>
            <button class="md-button md-button--none" ng-click="$ctrl.prevMonth()">
              <i class="icon icon-arrow-left_12"></i>
            </button>
            <button class="md-button md-button--none" ng-click="$ctrl.nextMonth()">
              <i class="icon icon-arrow-right_12"></i>
            </button>
            <button class="md-button md-button--none" ng-if="$ctrl.showYearArrow" ng-click="$ctrl.nextYear()">
              <i class="icon icon-arrow-circle-right_12"></i>
            </button>
          </div>
        </div>

        <div class="md-datepicker__day--names">
          <div class="md-datepicker__day--name" ng-repeat="dn in $ctrl.dayNames track by $index">{{ dn }}</div>
        </div>
      </div>

      <div class="md-datepicker__month">
        <div class="md-datepicker__week" ng-repeat="week in $ctrl.weeks track by $index">
          <button
            class="md-button md-button--circle md-button--28 md-datepicker__day"
            ng-click="$ctrl.selectDate($event, day)"
            ng-class="{
              'md-datepicker__day--selected': $ctrl.isSelectedDay(day),
              'md-datepicker__day--start': $ctrl.isSelectedDay(day) && $ctrl.lastEnabledDate,
              'md-datepicker__day--end': $ctrl.isSelectedDay(day) && $ctrl.firstEnabledDate,
              'md-datepicker__day--hovered md-datepicker__day--inrange': day.inRange,
              'md-datepicker__day--today': $ctrl.isToday(day),
              'md-datepicker__day--outside-month': !day.active || !day.enabled }"
            ng-disabled="!day.active || !day.enabled"
            ng-repeat="day in week.days track by $index"
            tooltip-html-unsafe="{{ $ctrl.disabledTooltipText }}"
            tooltip-popup-delay="200"
            tooltip-enable="!day.active && $ctrl.disabledTooltipText"
            tooltip-animation="false"
            tooltip-append-to-body="true"
            tooltip-class="md-datepicker-tooltip"
          >
          <span class="md-button__children"> {{ day.day }} </span>
          </button>
        </div>
      </div>
    </div>
  `;
  public bindings = {
    format: '@',
    viewFormat: '@',
    firstEnabledDate: '@',
    lastEnabledDate: '@',
    disabledTooltipText: '@',
    locale: '@',
    placeholder: '@',
    isRequired: '<',
    isDisabled: '<',
    isError: '<',
    showYearArrow: '<?',
    id: '@?',
    class: '@?',
    selectedDate: '@',
    onChangeFn: '&',
  };
}
