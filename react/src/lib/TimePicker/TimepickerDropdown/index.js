import React from 'react';
import PropTypes from 'prop-types';

class TimepickerDropdown extends React.PureComponent {

  render() {
    const { children } = this.props;

    return (
      /* eslint-disable */
      // Disabled due to onClick on div - needed to not close DropDown Prematurely
      <div
        className={'cui-timepicker__dropdown-container'}
        onClick={e => e.stopPropagation()}
      >
        <div className={'cui-timepicker__dropdown'}>
          <div className="inline-flex">{children}</div>
        </div>
      </div>
      /* eslint-enable */
    );
  }
}

TimepickerDropdown.propTypes = {
  /** @prop Children node to render within TimePickerDropdown | null */
  children: PropTypes.node
};

TimepickerDropdown.defaultProps = {
  children: null
};

TimepickerDropdown.displayName = 'TimepickerDropdown';

export default TimepickerDropdown;