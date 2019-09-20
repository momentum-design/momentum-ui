/** @component date-range-picker */
import * as moment from 'moment';
import { forEach, map } from 'lodash';

export type DateRangeOption = {
  label: string,
  value: number | moment.Moment[],
};

type InnerDateRangeOption = {
  label: string,
  start: moment.Moment,
  end: moment.Moment,
  active?: boolean,
}

class DateRangePickerController implements ng.IComponentController {
  public static $inject = ['$scope', '$document', '$element'];
  public placeholder: string;
  public readonly: boolean;
  public noInput: boolean;
  public ranges: DateRangeOption[];
  public onChangeFn: any;
  public clearLabel: string;
  public applyLabel: string;

  public startDate: string | moment.Moment;
  public endDate: string | moment.Moment;
  public formattedStartDate: string;
  public formattedEndDate: string;
  public viewFormat: string = 'MM/DD/YYYY';
  public viewResult: string;
  public viewSeparator = '-';
  public hideIcon: boolean;
  public alignRight: boolean;

  private initialized: boolean;
  private showCalendar: boolean;
  private innerFormat = 'YYYY-MM-DD';
  private supportFormats = ['YYYY-MM-DD', 'MM-DD-YYYY', 'MM/DD/YYYY'];
  private innerFormattedStartDate: string;
  private innerFormattedEndDate: string;
  private rangeOptions: InnerDateRangeOption[];

  constructor(
    private $scope: ng.IScope,
    private $document: ng.IDocumentService,
    private $element: ng.IRootElementService,
  ) {
  }

  public $onInit() {
    this.initRanges();
    this.registerEvents();
    this.$element.addClass('angularjs');

    if (this.startDate) {
      if (typeof this.startDate === 'string') {
        this.startDate = moment(this.startDate, this.supportFormats);
      }
      this.startDateChanged(this.startDate as moment.Moment);
    }
    if (this.endDate) {
      if (typeof this.endDate === 'string') {
        this.endDate = moment(this.endDate, this.supportFormats);
      }
      this.endDateChanged(this.endDate as moment.Moment);
    }
    this.apply();
    this.initialized = true;
  }

  public selectRange(range: InnerDateRangeOption) {
    this.clearSelectedRangeOption();
    range.active = true;
    this.startDateChanged(range.start);
    this.endDateChanged(range.end);
    this.apply();
  }

  public focus() {
    if (this.readonly) {
      return;
    }
    this.showCalendar = true;
  }

  public startDateChanged(date: moment.Moment) {
    this.startDate = date;
    this.formattedStartDate = moment(date).format(this.viewFormat);
    this.innerFormattedStartDate = moment(date).format(this.innerFormat);
  }

  public endDateChanged(date: moment.Moment) {
    this.endDate = date;
    this.formattedEndDate = moment(date).format(this.viewFormat);
    this.innerFormattedEndDate = moment(date).format(this.innerFormat);
  }

  public apply(event?: any) {
    if (event) {
      this.clearSelectedRangeOption();
    }
    if (this.formattedStartDate && this.formattedEndDate) {
      this.viewResult = `${this.formattedStartDate} - ${this.formattedEndDate}`;
      if (this.initialized && this.onChangeFn && typeof this.onChangeFn === 'function') {
        this.onChangeFn({
          start: this.startDate,
          end: this.endDate,
        });
      }
    }
    this.closeCalendar();
  }

  public openCalendar() {
    if (this.noInput && this.showCalendar) {
      this.closeCalendar();
      return;
    }
    this.showCalendar = true;
  }

  public closeCalendar() {
    this.showCalendar = false;
  }

  public clear() {
    this.startDate = null;
    this.formattedStartDate = null;
    this.innerFormattedStartDate = null;
    this.endDate = null;
    this.formattedEndDate = null;
    this.innerFormattedEndDate = null;
    this.viewResult = null;
    this.closeCalendar();
  }

  private clearSelectedRangeOption() {
    forEach(this.rangeOptions, (range: InnerDateRangeOption) => {
      range.active = false;
    });
  }

  private registerEvents() {
    const clickEvent = (event: any) => {
      if (!this.showCalendar) {
        return;
      }

      let elem = event.target;
      while(elem) {
        if (elem.tagName.toLowerCase() === 'md-date-range-picker') {
          return;
        }
        elem = elem.parentElement;
      }
      this.closeCalendar();
      this.$scope.$apply();
    };
    this.$document.on('click', clickEvent);
    this.$scope.$on('$destroy', () => {
      this.$document.off('click', clickEvent);
    });
  }

  private initRanges() {
    this.rangeOptions = map(this.ranges, (range: DateRangeOption) => {
      let start;
      let end = moment();
      if (typeof range.value === "number") {
        if (range.value === 0) {
          start = moment();
        } else {
          start = moment().add(range.value + 1, 'd');
        }
      } else if (Array.isArray(range.value) && range.value.length >= 2) {
        start = range.value[0];
        end = range.value[1];
      }
      return {
        label: range.label,
        start: start,
        end: end,
      };
    });
  }
}

export class DateRangePickerComponent implements ng.IComponentOptions {
  public controller = DateRangePickerController;
  public template = `<div class="md-date-range-picker" ng-class="{'with-icon': !$ctrl.hideIcon}">
    <div class="view" ng-class="{'no-input': $ctrl.noInput}" ng-click="$ctrl.noInput && $ctrl.openCalendar()">
      <input
        class="md-input"
        ng-if="!$ctrl.noInput"
        ng-readonly="$ctrl.readonly"
        ng-disabled="$ctrl.readonly"
        placeholder="{{$ctrl.placeholder}}"
        ng-model="$ctrl.viewResult" ng-focus="$ctrl.focus()"/>
      <i class="icon icon-calendar-month_16" ng-if="!$ctrl.hideIcon"></i>
      <span ng-if="$ctrl.noInput">
        <span ng-bind="$ctrl.viewResult"></span>
        <span ng-bind="$ctrl.placeholder" ng-if="!$ctrl.viewResult"></span>
      </span>
    </div>
    <div ng-if="$ctrl.showCalendar" ng-class="{'align-right': $ctrl.alignRight}" class="md-event-overlay md-event-overlay--arrow md-event-overlay--bottom">
      <div class="md-event-overlay__arrow"></div>
      <div class="md-event-overlay__children">
        <div class="md-daterangepicker-content">
          <div class="md-list md-daterangepicker-ranges" role="list">
            <div ng-repeat="option in $ctrl.rangeOptions"
                  ng-class="{'active': option.active}"
                  ng-click="$ctrl.selectRange(option)"
                  class="md-list-item">
              {{option.label}}
            </div>
          </div>
          <div class="calendar-container">
            <md-date-range-picker-calendar
              class="start-calendar"
              selected-date="{{$ctrl.innerFormattedStartDate}}"
              on-change-fn="$ctrl.startDateChanged(date)"
              last-enabled-date="{{$ctrl.innerFormattedEndDate}}"></md-date-range-picker-calendar>
          </div>
          <div class="calendar-container">
            <md-date-range-picker-calendar
              class="end-calendar"
              selected-date="{{$ctrl.innerFormattedEndDate}}"
              on-change-fn="$ctrl.endDateChanged(date)"
              first-enabled-date="{{$ctrl.innerFormattedStartDate}}">
            </md-date-range-picker-calendar>
          </div>
        </div>
        <div class="md-daterangepicker-footer">
          <span class="result-view" ng-if="$ctrl.formattedStartDate || $ctrl.formattedEndDate">
            <span ng-bind="$ctrl.formattedStartDate"></span>
            <span ng-bind="$ctrl.viewSeparator"></span>
            <span ng-bind="$ctrl.formattedEndDate"></span>
          </span>
          <button ng-click="$ctrl.clear()" class="md-button md-button--28">{{$ctrl.clearLabel || 'Clear'}}</button>
          <button
            ng-click="$ctrl.apply($event)"
            ng-disabled="!$ctrl.startDate || !$ctrl.endDate"
            class="md-button md-button--28 md-button--blue">{{$ctrl.applyLabel || 'Apply'}}</button>
        </div>
      </div>
    </div>
  </div>`;
  public bindings = {
    endDate: '=?',
    startDate: '=?',
    ranges: '<?',
    noInput: '<?',
    hideIcon: '<?',
    readonly: '<?',
    alignRight: '<?',
    clearLabel: '@?',
    viewFormat: '@?',
    placeholder: '@?',
    applyLabel: '@?',
    onChangeFn: '&',
  };
}