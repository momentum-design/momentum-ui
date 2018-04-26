import React from 'react';
import PropTypes from 'prop-types';

export default class TimepickerDropdown extends React.PureComponent {
  static displayName = 'TimepickerDropdown';

  render() {
    const { children } = this.props;

    return (
      /* eslint-disable */
      // Disabled due to onClick on div - needed to not close DropDown Prematurely
      <div
        className={'cui-timepicker__dropdown-container'}
        onClick={e => e.stopPropagation()}>
        <div className={'cui-timepicker__dropdown'}>
          <div className="inline-flex">{children}</div>
        </div>
      </div>
      /* eslint-enable */
    );
  }
}

TimepickerDropdown.defaultProps = {
  children: null
};

TimepickerDropdown.propTypes = {
  /** Child component to display within Dropdown */
  children: PropTypes.node
};
