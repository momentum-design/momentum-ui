import React from 'react';
import PropTypes from 'prop-types';
import Month from '@collab-ui/react/Datepicker/Month';
import { Button, Icon }  from '@collab-ui/react';

import * as utils from '@collab-ui/react/Datepicker/date_utils';

export default class Calendar extends React.Component {
  static displayName = 'Calendar';

  state = {
    date: null,
  };

  componentWillMount () {
    const { focus, selected } = this.context;
    this.setState({
      date: focus || selected || utils.now(),
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { focus } = this.context;
    if (
      nextContext.focus &&
      !utils.isSameDay(nextContext.focus, focus)
    ) {
      this.setState({
        date: nextContext.focus,
      });
    }
  }

  increaseMonth = () => {
    const { handleMonthChange } = this.context;
    const { date } = this.state;
    this.setState(
      {
        date: utils.addMonths(utils.cloneDate(date), 1)
      },
      () => handleMonthChange && handleMonthChange(this.state.date)
    );
  };

  decreaseMonth = () => {
    const { handleMonthChange } = this.context;
    const { date } = this.state;
    this.setState(
      {
        date: utils.subtractMonths(utils.cloneDate(date), 1)
      },
      () => handleMonthChange && handleMonthChange(this.state.date)
    );
  };

  render() {

    const { date } = this.state;
    const { monthFormat, locale, ...otherProps } = this.props;

    const renderCurrentMonth = () => {
      return (
        <div className='cui-datepicker__navigation--current-month'>
          {utils.formatDate(utils.localizeDate(date, locale), monthFormat)}
        </div>
      );
    };

    const renderPreviousMonthButton = () => {
      const allPrevDaysDisabled = utils.allDaysDisabledBefore(
        date,
        'month',
        this.props
      );

      return (
        <Button
          color='none'
          ariaLabel="previous"
          className='cui-datepicker__navigation--buttons--previous'
          disabled={allPrevDaysDisabled}
          onClick={this.decreaseMonth}
          children={<Icon name='arrow-left_16' />}
        />
      );
    };

    const renderNextMonthButton = () => {
      const allNextDaysDisabled = utils.allDaysDisabledAfter(
        date,
        'month',
        this.props
      );

      return (
        <Button
          color='none'
          ariaLabel="next"
          className='cui-datepicker__navigation--buttons--next'
          disabled={allNextDaysDisabled}
          onClick={this.increaseMonth}
          children={<Icon name='arrow-right_16' />}
        />
      );
    };

    const header = () => {
      const startOfWeek = utils.getStartOfWeek(utils.cloneDate(date));
      const dayNames = [];
      return dayNames.concat(
        [0, 1, 2, 3, 4, 5, 6].map(offset => {
          const day = utils.addDays(utils.localizeDate(startOfWeek, locale), offset);
          const localeData = utils.getLocaleData(day);
          const weekDayName = utils.getWeekdayMinInLocale(localeData, day);
          return (
            <div key={offset} className='cui-datepicker__day--name'>
              {weekDayName}
            </div>
          );
        })
      );
    };

    const renderMonths = () => {
      return (
        <div className='cui-datepicker__month-container'>
          <div className='cui-datepicker__header'>
            <div className='cui-datepicker__navigation'>
              {renderCurrentMonth()}
              <div className='cui-datepicker__navigation--buttons'>
                {renderPreviousMonthButton()}
                {renderNextMonthButton()}
              </div>
            </div>
            <div className='cui-datepicker__day--names'>
              {header()}
            </div>
          </div>
          <Month
            day={date}
            {...otherProps}
          />
        </div>
      );
    };

    return (
      <div>
        {renderMonths()}
      </div>
    );
  }
}

Calendar.contextTypes = {
  handleMonthChange: PropTypes.func,
  focus: PropTypes.object,
  selected: PropTypes.object,
};

Calendar.propTypes = {
  monthFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  locale: PropTypes.string,
};
