"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isNumber = _interopRequireDefault(require("lodash/isNumber"));

var _round = _interopRequireDefault(require("lodash/round"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Spinner = function Spinner(props) {
  var className = props.className,
      color = props.color,
      showCheck = props.showCheck,
      percentage = props.percentage,
      showPercentage = props.showPercentage,
      size = props.size,
      otherHTMLProps = _objectWithoutPropertiesLoose(props, ["className", "color", "showCheck", "percentage", "showPercentage", "size"]);

  if ((0, _isNumber.default)(percentage)) {
    if (size !== 36 && showPercentage) {
      /* eslint-disable no-console */
      console.warn('[@momentum-ui/react] Spinner: Percentage will not be shown for sizes smaller than 36');
      /* eslint-enable no-console */
    }

    return /*#__PURE__*/_react.default.createElement("div", _extends({
      className: "md-spinner-progress" + (" md-spinner-progress__percentage-" + (0, _round.default)(percentage)) + ("" + (size && " md-spinner-progress--" + size || '')) + ("" + (color && " md-spinner-progress--" + color || '')) + ("" + (className && " " + className || ''))
    }, otherHTMLProps), /*#__PURE__*/_react.default.createElement("div", {
      className: "md-spinner-progress__circle"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "md-spinner-progress__mask md-spinner-progress__full"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "md-spinner-progress__fill"
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "md-spinner-progress__mask md-spinner-progress__half"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "md-spinner-progress__fill"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "md-spinner-progress__fill md-spinner-progress__fix"
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "md-spinner-progress__inset-circle" + ("" + (showCheck && percentage === 100 && ' md-spinner-progress__inset-circle--check' || ''))
    }, size === 36 && showPercentage && !showCheck && /*#__PURE__*/_react.default.createElement("div", {
      className: "md-spinner-progress__percentage"
    }, (0, _round.default)(percentage)))));
  } else {
    return /*#__PURE__*/_react.default.createElement("i", _extends({
      className: "md-spinner" + ("" + (size && " md-spinner--" + size || '')) + ("" + (color && " md-spinner--" + color || '')) + ("" + (className && " " + className || ''))
    }, otherHTMLProps));
  }
};

Spinner.propTypes = {
  /** @prop Optional CSS class names | '' */
  className: _propTypes.default.string,

  /** @prop Set Spinner color | '' */
  color: _propTypes.default.string,

  /** @prop Show percentage value for progress on Spinner | null */
  percentage: _propTypes.default.number,

  /** @prop Show the check mark if percentage 100 | false */
  showCheck: _propTypes.default.bool,

  /** @prop Show the number value for progress on Spinner | false */
  showPercentage: _propTypes.default.bool,

  /** @prop Spinner size | 36 */
  size: _propTypes.default.oneOf([16, 20, 28, 36])
};
Spinner.defaultProps = {
  className: '',
  color: 'black',
  percentage: null,
  showCheck: false,
  showPercentage: false,
  size: 36
};
Spinner.displayName = 'Spinner';
var _default = Spinner;
exports.default = _default;