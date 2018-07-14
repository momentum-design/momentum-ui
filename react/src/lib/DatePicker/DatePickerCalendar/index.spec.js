import React from 'react';
import { mount } from 'enzyme';
import DatePickerCalendar from '../DatePickerCalendar';
import {
  isSameDay,
  now
} from '@collab-ui/react/utils/dateUtils';
import moment from 'moment-timezone';

describe('tests for <DatePickerCalendar />', () => {
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
    const calendar = mount(
      <DatePickerCalendar monthFormat={monthFormat} />,
      { context:{} }
    );
    expect(isSameDay(calendar.state().date, now())).toEqual(true);
  });

  it('should start with the focus date if it is provided', () => {
    const calendar = mount(
      <DatePickerCalendar monthFormat={monthFormat} />,
      { context:{ focus: day, selected: moment('2018-04-02') } }
    );
    expect(isSameDay(calendar.state().date, day)).toEqual(true);
  });

  it('should start with the selected date in view if provided and focus date is not provided', () => {
    const calendar = mount(
      <DatePickerCalendar monthFormat={monthFormat} />,
      { context:{ selected: day } }
    );
    expect(isSameDay(calendar.state().date, day)).toEqual(true);
  });

  it('should display month, navigation buttons and month name', () => {
    const calendar = mount(
      <DatePickerCalendar monthFormat={monthFormat} />,
      { context:{ selected: day, focus: day } }
    );
    expect(calendar.find('DatePickerDay')).toHaveLength(35);
    expect(calendar.find('DatePickerWeek')).toHaveLength(5);
    expect(calendar.find('DatePickerMonth')).toHaveLength(1);

    expect(calendar.find('.cui-datepicker__navigation--current-month').text()).toEqual('April 2018');
    expect(calendar.find('.cui-button.cui-button--icon').at(1).props().disabled).toEqual(false);
    expect(calendar.find('.cui-button.cui-button--icon').at(0).props().disabled).toEqual(false);
    expect(calendar.find('.cui-button.cui-datepicker__day--selected').text()).toEqual("1");
    expect(calendar.find('.cui-button.cui-datepicker__day--focus').text()).toEqual("1");
  });

  it('should next and previous buttons disabled when the other months are disabled', () => {
    const calendar = mount(
      <DatePickerCalendar
        monthFormat={monthFormat}
        minDate={day.toDate()}
        maxDate={day.clone().add(2, 'days').toDate()}
      />,
      { context:{ selected: day } }
    );
    expect(calendar.find('.cui-button--icon').at(1).props().disabled).toEqual(true);
    expect(calendar.find('.cui-button--icon').at(0).props().disabled).toEqual(true);
  });

  it('when next is clicked should switch to next month vice-versa', () => {
    const calendar = mount(
      <DatePickerCalendar monthFormat={monthFormat} />,
      { context:{ selected: day } }
    );
    calendar.find('.cui-button.cui-button--icon').at(1).simulate('click');
    expect(calendar.find('.cui-datepicker__navigation--current-month').text()).toEqual('May 2018');
    calendar.find('.cui-button.cui-button--icon').at(0).simulate('click');
    expect(calendar.find('.cui-datepicker__navigation--current-month').text()).toEqual('April 2018');
  });

  it('should disable dates that are filtered', () => {
    const calendar = mount(
      <DatePickerCalendar
        monthFormat={monthFormat}
        filterDate={day => day.day() == '0'}
      />,
      { context:{ selected: day } }
    );
    calendar.find('DatePickerWeek')
    .forEach(week =>{
        expect(
          week.find('DatePickerDay')
            .at(0)
            .find('button.cui-button')
            .props().disabled
        ).toEqual(true);
      }
    );
  });

});
