import React from 'react';
import { shallow, mount } from 'enzyme';
import DatePickerMonth from '../DatePickerMonth';
import moment from 'moment-timezone';

const TEST_DATE = '2018-04-01';

describe('tests for <DatePickerMonth />', () => {
  let day;

  beforeAll(() => {
    // setting timezone to CST
    moment.tz.setDefault('Asia/Kolkata');
    day = moment(TEST_DATE);
  });

  afterAll(() => {
    moment.tz.setDefault();
  });

  it('should match month SnapShot', () => {
    const container = shallow(
      <DatePickerMonth day={day} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render all days of the month correctly', () => {
    const container = mount(
      <DatePickerMonth day={day} />
    );
    expect(container.find('DatePickerWeek')).toHaveLength(5);
    expect(container.find('DatePickerDay')).toHaveLength(35);
  });
});
