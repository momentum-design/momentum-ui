import React from 'react';
import { shallow } from 'enzyme';
import DatePickerWeek from '../DatePickerWeek';
import moment from 'moment-timezone';

const TEST_DATE = '2018-04-01';

describe('tests for <DatePickerWeek />', () => {
  let day;

  beforeAll(() => {
    // setting timezone to CST
    moment.tz.setDefault('Asia/Kolkata');
    day = moment(TEST_DATE);
  });

  afterAll(() => {
    moment.tz.setDefault();
  });

  it('should match week SnapShot', () => {
    const container = shallow(
      <DatePickerWeek day={day} month={3} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render a div', () => {
    const container = shallow(
      <DatePickerWeek day={day} month={3} />
    );
    expect(container.find('.cui-datepicker__week').length).toEqual(1);
  });

  it('should render 7 Day components', () => {
    const container = shallow(
      <DatePickerWeek day={day} month={3} />
    );
    expect(container.find('DatePickerDay')).toHaveLength(7);
  });

});
