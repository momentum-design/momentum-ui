import { mount } from '@vue/test-utils';
import DatePickerCalendar from '../index.vue';
import DatePickerDay from '../../date-picker-day/index.vue';
import DatePickerWeek from '../../date-picker-week/index.vue';
import DatePickerMonth from '../../date-picker-month/index.vue';
import Button from '../../../button/index.vue';
import Icon from '../../../icon/index.vue';
import Vue from 'vue';
import moment from 'moment-timezone';
import {
  isSameDay,
  now
} from '../../../utils/dateUtils.js';

Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);
Vue.component(DatePickerDay.name, DatePickerDay);
Vue.component(DatePickerWeek.name, DatePickerWeek);
Vue.component(DatePickerMonth.name, DatePickerMonth);

describe('DatePickerCalendar', () => {
  const monthFormat = 'MMMM YYYY';
  const TEST_DATE = '2018-04-01';
  let day;

  beforeAll(() => {
    // setting timezone to CST
    moment.tz.setDefault('Asia/Kolkata');
    day = moment(TEST_DATE);
  });

  afterAll(() => {
    moment.tz.setDefault();
  });

  it('should start with the current date in view if no date is passed in', () => {
    const calendar = mount(DatePickerCalendar, {
      propsData: {
        monthFormat: monthFormat
      }
    });
    expect(isSameDay(calendar.vm.date, now())).toEqual(true);
  });

  it('should start with the focus date if it is provided', () => {
    const calendar = mount(DatePickerCalendar, {
      propsData: {
        monthFormat: monthFormat
      },
      provide: {
        getFocus: () => day,
        getSelected: () => moment('2018-04-02'),
      }
    });
    expect(isSameDay(calendar.vm.date, day)).toEqual(true);
  });

  it('should start with the selected date in view if provided and focus date is not provided', () => {
    const calendar = mount(DatePickerCalendar, {
      propsData: {
        monthFormat: monthFormat
      },
      provide: {
        getSelected: () => day,
      }
    });
    expect(isSameDay(calendar.vm.date, day)).toEqual(true);
  });

  it('should display month, navigation buttons and month name', () => {
    const calendar = mount(DatePickerCalendar, {
      propsData: {
        monthFormat: monthFormat
      },
      provide: {
        getFocus: () => day,
        getSelected: () => day,
      }
    });

    expect(calendar.findAll(DatePickerDay)).toHaveLength(35);
    expect(calendar.findAll(DatePickerWeek)).toHaveLength(5);
    expect(calendar.findAll(DatePickerMonth)).toHaveLength(1);

    expect(calendar.find('.md-datepicker__navigation--current-month').text()).toEqual('April 2018');
    expect(calendar.findAll('.md-button.md-button--icon').at(1).attributes().disabled).toEqual(undefined);
    expect(calendar.findAll('.md-button.md-button--icon').at(0).attributes().disabled).toEqual(undefined);
    expect(calendar.find('.md-button.md-datepicker__day--selected').text()).toEqual("1");
    expect(calendar.find('.md-button.md-datepicker__day--focus').text()).toEqual("1");
  });

  it('should next and previous buttons disabled when the other months are disabled', () => {
    const calendar = mount(DatePickerCalendar, {
      propsData: {
        monthFormat: monthFormat,
        minDate: day.toDate(),
        maxDate: day.clone().add(2, 'days').toDate(),
      },
      provide: {
        getSelected: () => day,
      }
    });
    expect(calendar.findAll('.md-button--icon').at(1).attributes().disabled).toEqual('disabled');
    expect(calendar.findAll('.md-button--icon').at(0).attributes().disabled).toEqual('disabled');
  });

  it('when next is clicked should switch to next month vice-versa', () => {
    const calendar = mount(DatePickerCalendar, {
      propsData: {
        monthFormat: monthFormat,
      },
      provide: {
        getSelected: () => day,
      }
    });
    calendar.findAll('.md-button.md-button--icon').at(1).trigger('click');
    expect(calendar.find('.md-datepicker__navigation--current-month').text()).toEqual('May 2018');
    calendar.findAll('.md-button.md-button--icon').at(0).trigger('click');
    expect(calendar.find('.md-datepicker__navigation--current-month').text()).toEqual('April 2018');
  });

  it('should disable dates that are filtered', () => {
    const calendar = mount(DatePickerCalendar, {
      propsData: {
        monthFormat: monthFormat,
      },
      attrs: {
        filterDate: day => day.day() == '0'
      },
      provide: {
        getSelected: () => day,
      }
    });
    calendar.findAll(DatePickerWeek).wrappers
    .forEach(week =>{
        expect(
          week.findAll(DatePickerDay)
            .at(0)
            .find('button.md-button')
            .attributes().disabled
        ).toEqual('disabled');
      }
    );
  });
});

