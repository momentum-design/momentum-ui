"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component progress-bar */
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

  return _react.default.createElement("span", null, _react.default.createElement("div", {
    className: "progressbar-info",
    key: 0
  }, _react.default.createElement("span", {
    className: "progressbar-label"
  }, label), _react.default.createElement("span", {
    className: "progressbar-progress"
  }, getDisplayFormat())), _react.default.createElement("div", {
    className: "progress" + (" " + (getColor() || '')),
    key: 1
  }, _react.default.createElement("span", {
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
  color: _propTypes.default.string,

  /** @prop Format of dyanmic number | 'fraction' */
  displayFormat: _propTypes.default.oneOf(['none', 'fraction', 'percentage']),

  /** @prop Determines if the ProgressBar is dynamic | false */
  dynamic: _propTypes.default.bool,

  /** @prop Label text */
  label: _propTypes.default.string.isRequired,

  /** @prop Maximum number for progressBar | 100 */
  max: _propTypes.default.number,

  /** @prop Minimum number for progressBar | 0 */
  min: _propTypes.default.number,

  /** @prop Type of ProgressBar | 'determinate' */
  type: _propTypes.default.oneOf(['determinate', 'indeterminate']),

  /** @prop Number value */
  value: _propTypes.default.number.isRequired
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
var _default = ProgressBar;
exports.default = _default;