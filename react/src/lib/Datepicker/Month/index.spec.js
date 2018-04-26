import React from 'react';
import { shallow, mount } from 'enzyme';
import Month from '../Month';
import Week from '../Week';
import Day from '../Day';
import moment from 'moment-timezone';

const TEST_DATE = '2018-04-01';

describe('tests for <Month />', () => {
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
      <Month day={day} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render all days of the month correctly', () => {
    const container = mount(
      <Month day={day} />
    );
    expect(container.find(Week)).toHaveLength(5);
    expect(container.find(Day)).toHaveLength(35);
  });
});
