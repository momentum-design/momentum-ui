import React from 'react';
import { shallow, mount } from 'enzyme';
import Day from '../Day';
import moment from 'moment-timezone';

const TEST_DATE = '2018-04-21';

describe.only('tests for <Day />', () => {
  let day;

  beforeAll(() => {
    // setting timezone to CST
    moment.tz.setDefault('Asia/Kolkata');
    day = moment(TEST_DATE);
  });

  afterAll(() => {
    moment.tz.setDefault();
  });

  it('should match selected day SnapShot', () => {
    const selected = moment(TEST_DATE);
    const container = shallow(
      <Day day={day} month={3} selected={selected} />
    );
    expect(container).toMatchSnapshot();
  });

  describe('should apply the right modifier classes', () => {
    it('should apply a modifier, when the date does not belong to current month', () => {
      const container = mount(
        <Day day={day} month={10} />
      );
      expect(container.find('.cui-button').hasClass('cui-datepicker__day--outside-month')).toEqual(true);
    });

    it('should apply a modifier when the date is selected', () => {
      const container = mount(
        <Day day={day} />,
        {
          context: { selected: day }
        }
      );
      expect(container.find('.cui-button').hasClass('cui-datepicker__day--selected')).toEqual(true);
    });

    it('should apply a modifier when the date is today`s date', () => {
      const container = mount(
        <Day day={moment()} />
      );
      expect(container.find('.cui-button').hasClass('cui-datepicker__day--today')).toEqual(true);
    });

    it('should apply a modifier when the date is in focus', () => {
      const container = mount(
        <Day day={day} />,
        {
          context: { focus: day }
        }
      );
      expect(container.find('.cui-button').hasClass('cui-datepicker__day--focus')).toEqual(true);
    });
  });

  it('when Day the disabled, should set disabled prop on button', () => {
    const container = mount(
      <Day day={day} filterDate={() => false} />
    );
    expect(container.find('.cui-button').props().disabled).toEqual(true);
  });

  it('onclick of Day should call the callback in context', () => {
    const onClickFn = jest.fn();
    const container = mount(
      <Day day={day} focus={day} />,
      { context: { handleDayClick: onClickFn }}
    );
    container.find('.cui-button').simulate('click');
    expect(onClickFn).toHaveBeenCalled();
  });

  it('on press of enter/space key on Day, should call the callback in context', () => {
    const onClickFn = jest.fn();
    const container = mount(
      <Day day={day} focus={day} />,
      { context: { handleDayClick: onClickFn }}
    );
    container.find('.cui-button').simulate('keyDown', { which: 13 });
    expect(onClickFn).toHaveBeenCalled();
    container.find('.cui-button').simulate('keyDown', { which: 32 });
    expect(onClickFn).toHaveBeenCalledTimes(2);
  });

});
