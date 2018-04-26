import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@collab-ui/react';
import * as utils from '@collab-ui/react/Datepicker/date_utils';

export default class Day extends React.Component {
  static displayName = 'Day';

  handleClick = e => {
    const { handleDayClick } = this.context;
    const { day } = this.props;
    return (
      handleDayClick
      && handleDayClick(day, e)
    );
  };

  render() {
    const { day, month } = this.props;
    const { selected, focus } = this.context;

    const isOutsideMonth = month !== undefined && month !== utils.getMonth(day);
    const isSelected = utils.isSameDay(day, selected);
    const isToday = utils.isSameDay(day, utils.newDate());
    const disabled = utils.isDayDisabled(day, this.props);
    const hasFocus = utils.isSameDay(day, focus);

    return (
      <Button
        circle
        disabled={disabled}
        className={
          'cui-datepicker__day' +
          `${(isSelected && ` cui-datepicker__day--selected`) || ''}` +
          `${(hasFocus && ` cui-datepicker__day--focus`) || ''}` +
          `${(isToday && ` cui-datepicker__day--today`) || ''}` +
          `${(isOutsideMonth && ` cui-datepicker__day--outside-month`) || ''}`
        }
        onClick={this.handleClick}
        ariaLabel={`day-${utils.getDate(day)}`}
        aria-selected={isSelected}
        tabIndex={-1}
      >
        {utils.getDate(day)}
      </Button>
    );
  }
}

Day.contextTypes = {
  handleDayClick: PropTypes.func,
  focus: PropTypes.object,
  selected: PropTypes.object,
};

Day.propTypes = {
  day: PropTypes.object,
  month: PropTypes.number,
};
