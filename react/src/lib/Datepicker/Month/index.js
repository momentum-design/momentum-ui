import React from 'react';
import PropTypes from 'prop-types';
import Week from '@collab-ui/react/Datepicker/Week';
import * as utils from '@collab-ui/react/Datepicker/date_utils';

export default class Month extends React.Component {
  static displayName = 'Month';

  renderWeeks = () => {
    const { day, ...otherProps } = this.props;

    let i = 0;
    let currentWeekStart = utils.getStartOfWeek(
      utils.getStartOfMonth(utils.cloneDate(day))
    );

    const weeks = [];
    const month = utils.getMonth(day);

    do {
      weeks.push(
        <Week
          key={i++}
          day={currentWeekStart}
          month={month}
          {...otherProps}
        />
      );
      currentWeekStart = utils.addWeeks(utils.cloneDate(currentWeekStart), 1);

    } while(utils.isSameMonth(currentWeekStart, day));

    return weeks;
  };


  render() {
    return (
      <div
        className='cui-datepicker__month'
      >
        {this.renderWeeks()}
      </div>
    );
  }
}

Month.propTypes = {
  day: PropTypes.object.isRequired,
};
