function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import DatePickerWeek from "../DatePickerWeek";
import { addWeeks, getMonth, getStartOfMonth, getStartOfWeek, isSameMonth } from "../../utils/dateUtils";
import moment from 'moment';

var DatePickerMonth = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(DatePickerMonth, _React$Component);

  function DatePickerMonth() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.renderWeeks = function () {
      var _this$props = _this.props,
          day = _this$props.day,
          otherProps = _objectWithoutPropertiesLoose(_this$props, ["day"]);

      var i = 0;
      var currentWeekStart = getStartOfWeek(getStartOfMonth(day.clone()));
      var weeks = [];
      var month = getMonth(day);

      do {
        weeks.push(React.createElement(DatePickerWeek, _extends({
          key: i++,
          day: currentWeekStart,
          month: month
        }, otherProps)));
        currentWeekStart = addWeeks(currentWeekStart.clone(), 1);
      } while (isSameMonth(currentWeekStart, day));

      return weeks;
    };

    return _this;
  }

  var _proto = DatePickerMonth.prototype;

  _proto.render = function render() {
    return React.createElement("div", {
      className: "md-datepicker__month"
    }, this.renderWeeks());
  };

  return DatePickerMonth;
}(React.Component);

DatePickerMonth.displayName = 'DatePickerMonth';
DatePickerMonth.propTypes = {
  /** Required day for the DatePickerMonth */
  day: PropTypes.instanceOf(moment).isRequired
};
export default DatePickerMonth;