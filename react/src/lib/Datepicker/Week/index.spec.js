import React from 'react';
import { shallow } from 'enzyme';
import Week from '../Week';
import Day from '../Day';
import moment from 'moment-timezone';

const TEST_DATE = '2018-04-01';

describe('tests for <Week />', () => {
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
      <Week day={day} month={3} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render a div', () => {
    const container = shallow(
      <Week day={day} month={3} />
    );
    expect(container.find('.cui-datepicker__week').length).toEqual(1);
  });

  it('should render 7 Day components', () => {
    const container = shallow(
      <Week day={day} month={3} />
    );
    expect(container.find(Day)).toHaveLength(7);
  });

});
