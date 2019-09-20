import * as moment from 'moment';

class DateRangePickerExampleController implements ng.IComponentController {
  public startDate = '2019-1-23';
  public endDate = '2019-9-4';
  public dateFormat = 'MMM DD, YYYY';
  public dateRanges = [{
    label: 'Today',
    value: 0,
  }, {
    label: 'Last 7 Days',
    value: -7,
  }, {
    label: 'Last 30 Days',
    value: -30,
  }, {
    label: 'This Month',
    value: [moment().startOf('month'), moment().endOf('month')],
  }, {
    label: 'Last Month',
    value: [moment().month(moment().month() - 1).startOf('month'), moment().month(moment().month() - 1).endOf('month')],
  }, {
    label: 'This Year',
    value: [moment().startOf('year'), moment()],
  }];

  public select(start, end) {
    console.debug(`You selected ${start.format(this.dateFormat)} - ${end.format(this.dateFormat)}`);
  }
}

export class DateRangePickerExampleComponent implements ng.IComponentOptions {
  public controller = DateRangePickerExampleController;
  public template = `<div>
    <h2>Date Range Picker</h2>
    <span ng-bind="$ctrl.startDate"></span>
    <span ng-bind="$ctrl.endDate"></span>
    <div style="height: 110vh; text-align: center; margin: 10px 100px;">
      <md-date-range-picker style="width: 268px;"></md-date-range-picker>
      <br /><br />
      <md-date-range-picker
        class="test"
        hide-icon="false"
        readonly="false"
        view-format="{{$ctrl.dateFormat}}"
        start-date="$ctrl.startDate"
        end-date="$ctrl.endDate"
        ranges="$ctrl.dateRanges"
        style="width: 268px;"
        placeholder="Select date range"
        on-change-fn="$ctrl.select(start, end)"
        ></md-date-range-picker>
      <br /><br />
      <md-date-range-picker
        class="test"
        no-input="true"
        hide-icon="false"
        readonly="false"
        align-right="true"
        view-format="{{$ctrl.dateFormat}}"
        start-date="$ctrl.startDate"
        end-date="$ctrl.endDate"
        ranges="$ctrl.dateRanges"
        style="min-width: 268px; border: solid 1px #ddd; background: #efefef; border-radius: 4px;"
        clear-label="取消"
        apply-label="确定"
        placeholder="Select date range"
        on-change-fn="$ctrl.select(start, end)"
        ></md-date-range-picker>
    </div>
  </div>
  `;
}