function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component loader-spinner */
import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import round from 'lodash/round';

var Spinner = function Spinner(props) {
  var className = props.className,
      color = props.color,
      showCheck = props.showCheck,
      percentage = props.percentage,
      showPercentage = props.showPercentage,
      size = props.size,
      otherHTMLProps = _objectWithoutPropertiesLoose(props, ["className", "color", "showCheck", "percentage", "showPercentage", "size"]);

  if (isNumber(percentage)) {
    if (size !== 36 && showPercentage) {
      /* eslint-disable no-console */
      console.warn('[@momentum-ui/react] Spinner: Percentage will not be shown for sizes smaller than 36');
      /* eslint-enable no-console */
    }

    return React.createElement("div", _extends({
      className: "md-spinner-progress" + (" md-spinner-progress__percentage-" + round(percentage)) + ("" + (size && " md-spinner-progress--" + size || '')) + ("" + (color && " md-spinner-progress--" + color || '')) + ("" + (className && " " + className || ''))
    }, otherHTMLProps), React.createElement("div", {
      className: "md-spinner-progress__circle"
    }, React.createElement("div", {
      className: "md-spinner-progress__mask md-spinner-progress__full"
    }, React.createElement("div", {
      className: "md-spinner-progress__fill"
    })), React.createElement("div", {
      className: "md-spinner-progress__mask md-spinner-progress__half"
    }, React.createElement("div", {
      className: "md-spinner-progress__fill"
    }), React.createElement("div", {
      className: "md-spinner-progress__fill md-spinner-progress__fix"
    })), React.createElement("div", {
      className: "md-spinner-progress__inset-circle" + ("" + (showCheck && percentage === 100 && ' md-spinner-progress__inset-circle--check' || ''))
    }, size === 36 && showPercentage && !showCheck && React.createElement("div", {
      className: "md-spinner-progress__percentage"
    }, round(percentage)))));
  } else {
    return React.createElement("i", _extends({
      className: "md-spinner" + ("" + (size && " md-spinner--" + size || '')) + ("" + (color && " md-spinner--" + color || '')) + ("" + (className && " " + className || ''))
    }, otherHTMLProps));
  }
};

Spinner.propTypes = {
  /** @prop Optional CSS class names | '' */
  className: PropTypes.string,

  /** @prop Set Spinner color | '' */
  color: PropTypes.string,

  /** @prop Show percentage value for progress on Spinner | null */
  percentage: PropTypes.number,

  /** @prop Show the check mark if percentage 100 | false */
  showCheck: PropTypes.bool,

  /** @prop Show the number value for progress on Spinner | false */
  showPercentage: PropTypes.bool,

  /** @prop Spinner size | 36 */
  size: PropTypes.oneOf([16, 20, 28, 36])
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
export default Spinner;