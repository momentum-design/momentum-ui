import React from 'react';
import PropTypes from 'prop-types';

class TimePickerDropdown extends React.PureComponent {

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

TimePickerDropdown.propTypes = {
  /** Children node to render within TimePickerDropdown | null */
  children: PropTypes.node
};

TimePickerDropdown.defaultProps = {
  children: null
};

TimePickerDropdown.displayName = 'TimePickerDropdown';

export default TimePickerDropdown;
