import React from 'react';
import PropTypes from 'prop-types';
import Day from '@collab-ui/react/Datepicker/Day';
import * as utils from '@collab-ui/react/Datepicker/date_utils';

export default class Week extends React.PureComponent {
  static displayName = 'Week';

  render() {
    const {
      day,
      ...otherProps
    } = this.props;

    const renderDays = () => {
      const startOfWeek = utils.getStartOfWeek(utils.cloneDate(day));

      const days = [0, 1, 2, 3, 4, 5, 6].map(offset => {
        const day = utils.addDays(utils.cloneDate(startOfWeek), offset);
        return (
          <Day
            key={offset}
            day={day}
            {...otherProps}
          />
        );
      });

      return days;
    };

    return (
      <div className="cui-datepicker__week">
        {renderDays()}
      </div>
    );
  }
}

Week.propTypes = {
  day: PropTypes.object.isRequired,
};
