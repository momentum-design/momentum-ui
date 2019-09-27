/** @component datepicker */
import * as _ from 'lodash';
import * as moment from 'moment';
import { KeyCodes } from '../../directives/dropdown/keyCodes';
import { DropdownService } from '../../services/dropdown';

export interface IDay {
  day: number | string;
  month: number | string;
  year: number | string;
  enabled?: boolean;
  active?: boolean;
}

export interface IWeek {
  days: IDay[];
}

export class DatePickerController implements ng.IComponentController {
  public static $inject = ['$dropdown', '$document', '$element', '$scope', '$timeout'];
  private readonly DATE = 'date';
  private readonly DEFAULT_DATE_VALUE = 'MMMM YYYY';
  private readonly DEFAULT_FORMAT = 'YYYY-MM-DD';
  private readonly DEFAULT_VIEW_FORMAT = 'MMMM DD, YYYY';
  private readonly DEFAULT_LOCALE = 'en';
  private readonly MONTH = 'month';
  public selectedDate: any;
  public firstEnabledDate?: string;
  public lastEnabledDate?: string;
  public disabledTooltipText: string;
  public placeholder: string;
  public required: boolean;
  public disabled: boolean;
  public showYearArrow?: boolean;
  public id?: string;
  public setDate: any;
  public onChangeFn?: Function;
  public weeks: IWeek[] = [];
  public dayNames: string[] = [];
  public viewValue?: any;
  public dateValue?: any;
  public selectedDay?: any;
  public selectedMonth?: any;
  public aboveButton: boolean = false;
  public datePickerForm: ng.IFormController;
  private _calendarOpened: boolean = false;
  private _format?: string;
  private _locale?: string;
  private _viewFormat?: string;
  private date?: any;
  private classList: string[] = ['md-datepicker', 'md-datepicker-input', 'icon-cal'];

  constructor (
    private $dropdown: DropdownService,
    private $document: ng.IDocumentService,
    private $element: ng.IRootElementService,
    private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService,
  ) {}

  public $onInit() {
    moment.locale(this.locale);
    this.generateDayNames();
    this.setDates(this.selectedDate);

    if (!_.isUndefined(this.id)) {
      this.classList.push(this.id);
    }

    const clickEvent = (e) => {
      if (!this.calendarOpened) {
        return;
      }

      let i = 0,
        element;

      if (!e.target) {
        return;
      }

      for (element = e.target; element; element = element.parentNode) {
        let id: string = element.id;
        let classNames: string = element.className;

        if (id !== undefined) {
          for (i = 0; i < this.classList.length; i += 1) {
            if (id.indexOf(this.classList[i]) > -1 || classNames.indexOf(this.classList[i]) > -1) {
              return;
            }
          }
        }
      }

      this.closeCalendar();
      this.$scope.$apply();
    };

    this.$document.on('click', clickEvent);
    this.$scope.$on('$destroy', () => {
      this.$document.off('click', clickEvent);
    });

    this.$element.on('keydown', ($event: JQueryEventObject) => {
      const focusableElements = this.$element.find('button:not([disabled])');

      if ($event.which === KeyCodes.TAB
        && (($event.shiftKey && focusableElements.first()[0] === $event.target)
        || (!$event.shiftKey && focusableElements.last()[0] === $event.target))) {
        this.closeCalendar();
        this.$scope.$apply();
      }
    });
  }

  public $onChanges(changes) {
    const { selectedDate } = changes;
    if (!_.isUndefined(selectedDate.currentValue) && selectedDate.currentValue !== selectedDate.previousValue) {
      this.setDates(selectedDate.currentValue);
    }
  }

  public get format(): string {
    return this._format ? this._format : this.DEFAULT_FORMAT;
  }

  public set format(format) {
    this._format = format;
  }

  public get calendarOpened(): boolean {
    return this._calendarOpened;
  }

  public set calendarOpened(isOpen: boolean) {
    this._calendarOpened = isOpen;
    this.$timeout(() => {
      const calendar = this.$element.find('.md-event-overlay__children')[0];
      if (calendar) {
        this.aboveButton = !this.$dropdown.isVisible(calendar);
      } else {
        this.aboveButton = false;
      }
    }, 10);
  }

  public get locale(): string {
    return this._locale ? this._locale : this.DEFAULT_LOCALE;
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

  public showCalendar(event: Event) {
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    if (!_.isUndefined(this.selectedDate)) {
      this.date = moment(this.viewValue, this.viewFormat);
    }
    if (!this.date.isValid()) {
      this.date = moment();
    }
    this.calendarOpened = !this.calendarOpened;
    if (this.calendarOpened) {
      this.generateCalendar(this.date);
    }
  }

  public hasClearButton(): boolean {
    return _.isUndefined(this.required) ? false : this.required;
  }

  public closeCalendar() {
    this.calendarOpened = false;
  }

  public prevYear() {
    this.date.subtract(1, 'Y');
    this.generateCalendar(this.date);
  }

  public prevMonth() {
    this.date.subtract(1, 'M');
    this.generateCalendar(this.date);
  }

  public nextMonth = () => {
    this.date.add(1, 'M');
    this.generateCalendar(this.date);
  }

  public nextYear() {
    this.date.add(1, 'Y');
    this.generateCalendar(this.date);
  }

  public selectDate(event: Event, date: any) {
    event.preventDefault();
    if (!date.active) {
      return;
    }

    this.setDates(moment(date.day + '.' + (date.month + 1) + '.' + date.year, 'DD.MM.YYYY'));
    this.closeCalendar();
    this.$element.find('.md-datapicker-normal').focus();
  }

  public clearDate(event: Event) {
    event.stopPropagation();
    this.selectedDate = undefined;
    this.setDates(undefined);
    this.selectedMonth = undefined;
    this.selectedDay = undefined;
    this.viewValue = undefined;
    this.date = moment();
  }

  public isSelectedDay(date: any) {
    if (!_.isUndefined(this.selectedDate)) {
      if ((this.selectedMonth === date.month) && (this.selectedDay === date.day)) {
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
      if (firstEnabled.isValid() && date.isBefore(firstEnabled)) {
        return false;
      }

      if (lastEnabled.isValid() && date.isAfter(lastEnabled)) {
        return false;
      }

      return true;
    };

    let j = 1;
    let k = 1;

    for (let i = 0; i <= lastDayOfMonth + firstWeekDay + extraDayCtr; i += 1) {
      if (i >= firstWeekDay && k <= lastDayOfMonth) {
        days.push({ day: k, month: month, year: year, enabled: true, active: isDateInBounds(k, month, year) });
        k++;
      } else if (i <= firstWeekDay) {
        days.push({
          day: preMonthLastDay - (firstWeekDay - 1) + i,
          month: month - 1,
          year: year,
          enabled: false,
        });
      } else {
        days.push({ day: j, month: month + 1, year: year, enabled: false });
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

  private setDates(selectedDate) {
    const selectedMoment = moment(selectedDate, this.format);
    if (!_.isUndefined(selectedDate) && selectedMoment.isValid()) {
      this.selectedDay = selectedMoment.date();
      this.selectedMonth = selectedMoment.month();
      this.viewValue = moment(selectedMoment).format(this.viewFormat);
      this.selectedDate = selectedMoment.format(this.format);
    } else {
      this.date = moment();
    }

    this.onChangeFn({
      date: this.selectedDate,
    });
  }
}

export class DatePickerComponent implements ng.IComponentOptions {
  public controller = DatePickerController;
  public template = `
    <div class="md-datepicker-container md-datepicker__wrapper" ng-form="$ctrl.datePickerForm">
      <button class="md-button md-button--white" ng-click="$ctrl.showCalendar($event)" ng-disabled="$ctrl.disabled" ng-class="{'md-error': $ctrl.isError}">
        <i class="icon icon-calendar-month_24"></i>
        <span class="md-button__text">{{ $ctrl.viewValue ? $ctrl.viewValue : $ctrl.placeholder }}</span>
        <i ng-if="$ctrl.hasClearButton()" class="icon icon-close" ng-click="$ctrl.clearDate($event)"></i>
      </button>

      <div ng-if="$ctrl.calendarOpened" class="md-datepicker__dropdown">
        <div class="md-event-overlay">
          <div class="md-event-overlay__children" ng-class="{ 'md-event-overlay--top': $ctrl.aboveButton }">
            <div class="md-datepicker__month-container">
              <div class="md-datepicker__header">
                <div class="md-datepicker__navigation">
                  <div class="md-datepicker__navigation--current-month">{{ $ctrl.dateValue }}</div>

                  <div class="md-datepicker__navigation--buttons">
                    <button class="md-button md-button--none" ng-if="$ctrl.showYearArrow()" ng-click="$ctrl.prevYear()">
                      <i class="icon icon-arrow-circle-left_24"></i>
                    </button>
                    <button class="md-button md-button--none" ng-click="$ctrl.prevMonth()">
                      <i class="icon icon-arrow-left_24"></i>
                    </button>
                    <button class="md-button md-button--none" ng-click="$ctrl.nextMonth()">
                      <i class="icon icon-arrow-right_24"></i>
                    </button>
                    <button class="md-button md-button--none" ng-if="$ctrl.showYearArrow()" ng-click="$ctrl.nextYear()">
                      <i class="icon icon-arrow-circle-right_24"></i>
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
                    ng-repeat="day in week.days track by $index"
                    ng-click="$ctrl.selectDate($event, day)"
                    ng-class="{ 'md-datepicker__day--selected': $ctrl.isSelectedDay(day), 'md-datepicker__day--today': $ctrl.isToday(day), 'md-datepicker__day--outside-month': !day.active || !day.enabled }"
                    ng-disabled="!day.active || !day.enabled"
                    tooltip-html-unsafe="{{ $ctrl.disabledTooltipText }}"
                    tooltip-popup-delay="200"
                    tooltip-enable="!day.active && $ctrl.disabledTooltipText"
                    tooltip-animation="false"
                    tooltip-append-to-body="true"
                    tooltip-class="md-datepicker-tooltip"
                  >
                    {{ day.day }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  public bindings = {
    format: '@',
    viewFormat: '@',
    firstEnabledDate: '@?',
    lastEnabledDate: '@?',
    disabledTooltipText: '@',
    locale: '@',
    placeholder: '@',
    isRequired: '<',
    isDisabled: '<',
    isError: '<',
    showYearArrow: '<?',
    id: '@?',
    selectedDate: '<',
    onChangeFn: '&',
  };
}
