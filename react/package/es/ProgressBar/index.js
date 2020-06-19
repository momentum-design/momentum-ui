/** @component progress-bar */
import React from 'react';
import PropTypes from 'prop-types';

var ProgressBar = function ProgressBar(props) {
  var label = props.label,
      min = props.min,
      max = props.max,
      value = props.value,
      dynamic = props.dynamic,
      displayFormat = props.displayFormat,
      color = props.color;
  var adjustedValue = max - value < 0 ? max : value;
  var valueFraction = adjustedValue / max * 100 || 0;
  var meterWidth = valueFraction + '%';

  var getDisplayFormat = function getDisplayFormat() {
    if (displayFormat === 'none') {
      return null;
    } else if (displayFormat === 'percentage') {
      return meterWidth;
    }

    return adjustedValue + " / " + max;
  };

  var getColor = function getColor() {
    if (color) {
      return color;
    } else if (dynamic) {
      if (valueFraction < 25) {
        return 'success';
      } else if (valueFraction < 50) {
        return 'info';
      } else if (valueFraction < 75) {
        return 'warning';
      }

      return 'danger';
    }
  };

  return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("div", {
    className: "progressbar-info",
    key: 0
  }, /*#__PURE__*/React.createElement("span", {
    className: "progressbar-label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "progressbar-progress"
  }, getDisplayFormat())), /*#__PURE__*/React.createElement("div", {
    className: "progress" + (" " + (getColor() || '')),
    key: 1
  }, /*#__PURE__*/React.createElement("span", {
    className: "meter",
    role: "progressbar",
    "aria-labelledby": "progressbar",
    "aria-valuenow": adjustedValue,
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuetext": meterWidth,
    style: {
      width: meterWidth
    }
  })));
};

ProgressBar.propTypes = {
  /** @prop Color class optional that will overwrite dynamic | '' */
  color: PropTypes.string,

  /** @prop Format of dyanmic number | 'fraction' */
  displayFormat: PropTypes.oneOf(['none', 'fraction', 'percentage']),

  /** @prop Determines if the ProgressBar is dynamic | false */
  dynamic: PropTypes.bool,

  /** @prop Label text */
  label: PropTypes.string.isRequired,

  /** @prop Maximum number for progressBar | 100 */
  max: PropTypes.number,

  /** @prop Minimum number for progressBar | 0 */
  min: PropTypes.number,

  /** @prop Type of ProgressBar | 'determinate' */
  type: PropTypes.oneOf(['determinate', 'indeterminate']),

  /** @prop Number value */
  value: PropTypes.number.isRequired
};
ProgressBar.defaultProps = {
  color: '',
  displayFormat: 'fraction',
  dynamic: false,
  max: 100,
  min: 0,
  type: 'determinate'
};
ProgressBar.displayName = 'ProgressBar';
export default ProgressBar;