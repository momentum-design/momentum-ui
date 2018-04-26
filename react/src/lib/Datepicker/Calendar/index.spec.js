import React from 'react';
import { mount } from 'enzyme';
import Calendar from '../Calendar';
import * as utils from '../date_utils';
import moment from 'moment-timezone';
import Month from '../Month';
import Week from '../Week';
import Day from '../Day';

describe('tests for <Calendar />', () => {
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
      <Calendar monthFormat={monthFormat} />,
      { context:{} }
    );
    expect(utils.isSameDay(calendar.state().date, utils.now())).toEqual(true);
  });

  it('should start with the focus date if it is provided', () => {
    const calendar = mount(
      <Calendar monthFormat={monthFormat} />,
      { context:{ focus: day, selected: moment('2018-04-02') } }
    );
    expect(utils.isSameDay(calendar.state().date, day)).toEqual(true);
  });

  it('should start with the selected date in view if provided and focus date is not provided', () => {
    const calendar = mount(
      <Calendar monthFormat={monthFormat} />,
      { context:{ selected: day } }
    );
    expect(utils.isSameDay(calendar.state().date, day)).toEqual(true);
  });

  it('should display month, navigation buttons and month name', () => {
    const calendar = mount(
      <Calendar monthFormat={monthFormat} />,
      { context:{ selected: day, focus: day } }
    );
    expect(calendar.find(Day)).toHaveLength(35);
    expect(calendar.find(Week)).toHaveLength(5);
    expect(calendar.find(Month)).toHaveLength(1);

    expect(calendar.find('.cui-datepicker__navigation--current-month').text()).toEqual('April 2018');
    expect(calendar.find('.cui-button.cui-datepicker__navigation--buttons--next').props().disabled).toEqual(false);
    expect(calendar.find('.cui-button.cui-datepicker__navigation--buttons--previous').props().disabled).toEqual(false);
    expect(calendar.find('.cui-button.cui-datepicker__day--selected').text()).toEqual("1");
    expect(calendar.find('.cui-button.cui-datepicker__day--focus').text()).toEqual("1");
  });

  it('should next and previous buttons disabled when the other months are disabled', () => {
    const calendar = mount(
      <Calendar monthFormat={monthFormat} minDate={day} maxDate={day.add(2, 'days')}/>,
      { context:{ selected: day } }
    );
    expect(calendar.find('.cui-button.cui-datepicker__navigation--buttons--next').props().disabled).toEqual(true);
    expect(calendar.find('.cui-button.cui-datepicker__navigation--buttons--previous').props().disabled).toEqual(true);
  });

  it('when next is clicked should switch to next month vice-versa', () => {
    const calendar = mount(
        <Calendar monthFormat={monthFormat} />,
        { context:{ selected: day } }
    );
    calendar.find('.cui-button.cui-datepicker__navigation--buttons--next').simulate('click');
    expect(calendar.find('.cui-datepicker__navigation--current-month').text()).toEqual('May 2018');
    calendar.find('.cui-button.cui-datepicker__navigation--buttons--previous').simulate('click');
    expect(calendar.find('.cui-datepicker__navigation--current-month').text()).toEqual('April 2018');
  });


});
